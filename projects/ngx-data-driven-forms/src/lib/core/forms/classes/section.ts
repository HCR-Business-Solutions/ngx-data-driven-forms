import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import {
  ConditionFn,
  CrossFieldValidatorFn,
  FieldValidatorFn,
  ValueOrArray,
} from '../../types';
import { resovleCrossFieldValidators } from '../../utils';
import {
  IQuestion,
  IRendererConfig,
  ISection,
  IShouldAsk,
} from '../interfaces';
import { Question } from './question';
import { ShouldAsk } from './should-ask';

export class Section implements ISection {
  id: string;
  title?: string | undefined;
  narrative?: string | undefined;
  questions: { [key: string]: Question };
  layout: ValueOrArray<string>[];
  repeat?:
    | {
        handler: string;
        min?: number;
        max?: number;
        addText?: string;
        itemHeader?: string;
        listArgs?: any[] | undefined;
      }
    | undefined;
  shouldAsk?: ShouldAsk | undefined;
  rendererConfig?: IRendererConfig | undefined;
  customProps?: { [key: string]: any } | undefined;

  constructor(section: ISection) {
    this.id = section.id;
    this.title = section.title;
    this.narrative = section.narrative;
    this.questions = {};
    Object.entries(section.questions).forEach(([key, value]) => {
      this.questions[key] = new Question(value);
    });
    this.layout = section.layout;
    this.repeat = section.repeat;
    this.shouldAsk = section.shouldAsk
      ? new ShouldAsk(section.shouldAsk)
      : undefined;
    this.rendererConfig = section.rendererConfig;
    this.customProps = section.customProps;
  }

  private getArrayValidators() {
    if (!this.repeat) return [];
    const validators: ValidatorFn[] = [];

    const min = this.repeat.min ?? undefined;
    const max = this.repeat.max ?? undefined;

    if (min !== undefined) {
      validators.push((control: AbstractControl) => {
        const length = (control as UntypedFormArray).length;
        if (length >= min) return null;
        return { arrayMin: { expected: min, actual: length } };
      });
    }

    if (max !== undefined) {
      validators.push((control: AbstractControl) => {
        const length = (control as UntypedFormArray).length;
        if (length <= max) return null;
        return { arrayMax: { expected: max, actual: length } };
      });
    }

    return validators;
  }

  public asForm(
    initialValue: any,
    fieldValidators: Map<string, FieldValidatorFn>,
    crossFieldValidators: Map<string, CrossFieldValidatorFn>,
    ignoreRepeat: boolean = false
  ): UntypedFormGroup | UntypedFormArray {
    if (!ignoreRepeat && this.repeat) {
      const arr = new UntypedFormArray([], {
        validators: this.getArrayValidators(),
      });
      if (initialValue && Array.isArray(initialValue)) {
        initialValue.forEach((value) =>
          arr.push(
            this.asFormGroup(value, fieldValidators, crossFieldValidators)
          )
        );
      }
      return arr;
    }

    return this.asFormGroup(
      initialValue,
      fieldValidators,
      crossFieldValidators
    );
  }

  public asFormGroup(
    initialValue: any,
    fieldValidators: Map<string, FieldValidatorFn>,
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): UntypedFormGroup {
    const controls = Object.entries(this.questions).reduce(
      (prev, [key, question]) => ({
        ...prev,
        [`${key}`]: question.control(
          initialValue ? initialValue[key] ?? null : null,
          fieldValidators
        ),
      }),
      {}
    );

    return new UntypedFormGroup(
      controls,
      this.getCrossFieldValidators(crossFieldValidators)
    );
  }

  public getCrossFieldValidators(
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): ValidatorFn[] {
    return resovleCrossFieldValidators(
      crossFieldValidators,
      Object.values(this.questions),
      1
    );
  }

  public getShouldAskWithSideEffects(
    control: AbstractControl,
    knownConditions: Map<string, ConditionFn>
  ): boolean {
    if (!this.shouldAsk) return true;
    return this.shouldAsk.shouldAskWithSideEffect(control, knownConditions);
  }

  public getChangeEvents(
    control: AbstractControl,
    knownConditions: Map<string, ConditionFn>
  ): Observable<boolean> | undefined {
    if (!this.shouldAsk) return undefined;
    return this.shouldAsk.gatherChangeEvents(control, knownConditions);
  }
}
