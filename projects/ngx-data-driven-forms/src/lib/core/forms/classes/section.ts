import { FormArray, FormGroup, ValidatorFn } from '@angular/forms';
import { CrossFieldValidatorFn } from 'dist/ngx-data-driven-forms/public-api';
import { FieldValidatorFn } from '../../types';
import {
  IQuestion,
  IRendererConfig,
  ISection,
  IShouldAsk,
} from '../interfaces';
import { Question } from './question';

export class Section implements ISection {
  id: string;
  title?: string | undefined;
  narrative?: string | undefined;
  questions: { [key: string]: Question };
  layout: string[];
  repeat?:
    | {
        handler: string;
        listRequirements?:
          | { minEntries?: number | undefined; maxEntries?: number | undefined }
          | undefined;
        listArgs?: any[] | undefined;
      }
    | undefined;
  shouldAsk?: IShouldAsk | undefined;
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
    this.shouldAsk = section.shouldAsk;
    this.rendererConfig = section.rendererConfig;
    this.customProps = section.customProps;
  }

  public asForm(
    initialValue: any,
    fieldValidators: Map<string, FieldValidatorFn>,
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): FormGroup | FormArray {
    if (this.repeat) {
      const arr = new FormArray([]);
      if (initialValue && Array.isArray(initialValue)) {
        initialValue.forEach((value) =>
          arr.push(
            this.asFormGroup(value, fieldValidators, crossFieldValidators)
          )
        );
      }
      return arr;
    }

    return this.asForm(initialValue, fieldValidators, crossFieldValidators);
  }

  public asFormGroup(
    initialValue: any,
    fieldValidators: Map<string, FieldValidatorFn>,
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): FormGroup {
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

    return new FormGroup(
      controls,
      this.getCrossFieldValidators(crossFieldValidators)
    );
  }

  public getCrossFieldValidators(
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): ValidatorFn[] {
    const resutlValidators: ValidatorFn[] = [];

    const relaventValidators = Object.values(this.questions)
      .filter(
        (_) => _.crossFieldValidation && _.crossFieldValidation.length > 0
      )
      .filter(
        (_) =>
          _.crossFieldValidation?.filter(
            (pack) => pack.expectedParentLevel === 1
          ).length ?? 0 > 0
      )
      .map((_) => ({
        id: _.id,
        validators: _.crossFieldValidation?.filter(
          (pack) => pack.expectedParentLevel === 1
        ),
      }));

    relaventValidators.forEach(({ id, validators }) => {
      if (!validators || validators.length <= 0) return;
      validators.forEach((validatorPack) => {
        Object.entries(validatorPack.validation).forEach(([key, arg]) => {
          const func = crossFieldValidators.get(key);
          if (!func) return;
          const funcEval = func(id, validatorPack.sibling, arg);
          if (funcEval) resutlValidators.push(funcEval);
        });
      });
    });

    return resutlValidators;
  }
}
