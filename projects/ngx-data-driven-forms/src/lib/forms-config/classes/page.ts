import { Statements } from './statements';
import { Section } from './section';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ICrossFieldValidatorPackage, IPage } from '../interfaces';
import {
  ConditionsFunction,
  NormalizedCrossFieldValidator,
  NormalizedValidator,
} from '../../types';
import { DynamicFormsUtils } from '../../utils';
import { QuestionGroup } from 'ngx-data-driven-forms';

export class Page implements IPage {
  public id: string;
  public title?: string;

  public narrative?: string;

  public sections: Section[];

  public shouldAsk?: Statements;
  public retainWhenNotAsked?: boolean;

  constructor(page: IPage) {
    this.id = page.id;
    this.title = page.title;

    this.narrative = page.narrative;

    this.sections = page.sections.map((_) => new Section(_));

    this.shouldAsk = page.shouldAsk
      ? new Statements(page.shouldAsk)
      : undefined;
    this.retainWhenNotAsked = page.retainWhenNotAsked;
  }

  public getForm(
    initialValue: any,
    fb: FormBuilder,
    knownValidators: Map<string, NormalizedValidator>,
    knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>
  ): FormGroup {
    const controls: { [key: string]: FormGroup | FormArray } =
      this.sections.reduce(
        (prev, curr) => ({
          ...prev,
          [`${curr.id}`]: curr.getForm(
            initialValue ? initialValue[curr.id] ?? null : null,
            fb,
            knownValidators,
            knownCrossFieldValidators
          ),
        }),
        {}
      );

    return new FormGroup(controls, this.getCrossFieldValidators(knownCrossFieldValidators));
  }

  public getShouldAsk(
    control: AbstractControl,
    customConditions?: Map<string, ConditionsFunction>
  ): boolean {
    if (!this.shouldAsk) return true;
    return this.shouldAsk.checkStatements(control, customConditions);
  }

  public changeEvents(
    control: AbstractControl,
    customConditions?: Map<string, ConditionsFunction>
  ): Observable<any> | undefined {
    if (!this.shouldAsk) return undefined;
    return DynamicFormsUtils.gatherChangeEvents(
      control,
      this.shouldAsk,
      this.retainWhenNotAsked,
      customConditions
    );
  }

  public getCrossFieldValidators(
    knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>
  ): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    this.sections.forEach((section) => {
      const relaventValidators = Object.values(section.questions)
        .filter(
          (_) => _.crossFieldValidation && _.crossFieldValidation.length > 0
        )
        .filter(
          (_) =>
            _.crossFieldValidation?.filter(
              (pack) => pack.expectedParentLevel === 2
            ).length ?? 0 > 0
        )
        .map((_) => ({
          id: _.id,
          crossFieldValidation: _.crossFieldValidation?.filter(
            (pack) => pack.expectedParentLevel
          ),
        }));

      relaventValidators.forEach(
        (questionValidaton: {
          id: string;
          crossFieldValidation?: ICrossFieldValidatorPackage[];
        }) => {
          if (
            !questionValidaton.crossFieldValidation ||
            questionValidaton.crossFieldValidation.length < 0
          )
            return;
          questionValidaton.crossFieldValidation.forEach((validatorPack) => {
            const siblingId = validatorPack.sibling;
            Object.entries<any>({
              ...(validatorPack.crossFieldValidation ?? {}),
              ...(validatorPack.customCrossFieldValidation ?? {}),
            }).forEach(([key, arg]: [string, any]) => {
              const func = knownCrossFieldValidators.get(key);
              if (!func) return;
              const funcEval = func(`${section.id}.${questionValidaton.id}`, siblingId, arg);
              if (funcEval) validators.push(funcEval);
            });
          });
        }
      );
    });

    return validators;
  }
}
