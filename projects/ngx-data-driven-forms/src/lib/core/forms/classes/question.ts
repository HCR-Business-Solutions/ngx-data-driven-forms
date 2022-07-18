import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConditionFn, FieldValidatorFn } from '../../types';
import {
  ICrossFieldValidationPack,
  IQuestion,
  IRendererConfig,
  IShouldAsk,
} from '../interfaces';
import { ShouldAsk } from './should-ask';

export class Question implements IQuestion {
  id: string;
  type: string;
  inputMode?:
    | 'none'
    | 'text'
    | 'decimal'
    | 'numeric'
    | 'tel'
    | 'search'
    | 'email'
    | 'url'
    | undefined;
  label?: string | undefined;
  ariaLabel?: string | undefined;
  placeholder?: string | undefined;
  hint?: string | undefined;
  readonly?: boolean | undefined;
  isFlag?: boolean | undefined;
  fieldValidation?: { [key: string]: any } | undefined;
  crossFieldValidation?: ICrossFieldValidationPack[] | undefined;
  shouldAsk?: ShouldAsk | undefined;
  rendererConfig?: IRendererConfig | undefined;
  customProps?: { [key: string]: any } | undefined;

  constructor(question: IQuestion) {
    this.id = question.id;
    this.type = question.type;
    this.inputMode = question.inputMode;
    this.label = question.label;
    this.ariaLabel = question.ariaLabel;
    this.placeholder = question.placeholder;
    this.hint = question.hint;
    this.readonly = question.readonly;
    this.isFlag = question.isFlag;
    this.fieldValidation = question.fieldValidation;
    this.crossFieldValidation = question.crossFieldValidation;
    this.shouldAsk = question.shouldAsk
      ? new ShouldAsk(question.shouldAsk)
      : undefined;
    this.rendererConfig = question.rendererConfig;
    this.customProps = question.customProps;
  }

  public control(
    initialValue: any,
    knownFieldValidators: Map<string, FieldValidatorFn>
  ): FormControl {
    return new FormControl(
      initialValue ?? null,
      this.getValidators(knownFieldValidators),
      null
    );
  }

  public getValidators(
    knownFieldValidators: Map<string, FieldValidatorFn>
  ): ValidatorFn[] {
    if (!this.fieldValidation) return [];
    return Object.entries(this.fieldValidation)
      .map(([key, val]) => ({
        val, // keep the value of the entry
        fieldValidator: knownFieldValidators.get(key), //use the key of the entry to attempt to get a function
      }))
      .map(
        ({ val, fieldValidator }) =>
          fieldValidator ? fieldValidator(val) : undefined //try to run the function, go to undefined if not exist
      )
      .filter((validator): validator is ValidatorFn => !!validator); // remove all undefined and fix type.
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
