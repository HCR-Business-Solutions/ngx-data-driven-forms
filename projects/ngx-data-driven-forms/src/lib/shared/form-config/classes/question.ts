import {Statements} from './statements';
import {AbstractControl, FormBuilder, FormControl, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {ICrossFieldValidatorPackage, ICustomValidation, IQuestion, IQuestionValidation} from '../interfaces';
import {ConditionsFunction, NormalizedValidator} from '../../types';
import { gatherChangeEvents } from '../../utilities';

export class Question implements IQuestion {

  id: string;
  type: string;

  label?: string;
  placeholder?: string;

  hint?: {
    text: string;
    format?: 'markdown' | 'plaintext';
  };


  readonly?: boolean;
  isFlag?: boolean;

  fieldConfig?: unknown;

  validation?: IQuestionValidation;
  customValidation?: ICustomValidation;
  crossFieldValidation?: ICrossFieldValidatorPackage[];


  shouldAsk?: Statements;
  retainWhenNotAsked?: boolean;


  constructor(question: IQuestion) {
    this.id = question.id;
    this.type = question.type;

    this.label = question.label;
    this.placeholder = question.placeholder;

    this.hint = question.hint;

    this.readonly = question.readonly;
    this.isFlag = question.isFlag;

    this.fieldConfig = question.fieldConfig;

    this.validation = question.validation;
    this.customValidation = question.customValidation;
    this.crossFieldValidation = question.crossFieldValidation;

    this.shouldAsk = question.shouldAsk ? new Statements(question.shouldAsk) : undefined;
    this.retainWhenNotAsked = question.retainWhenNotAsked;
  }

  public control(initialValue: any, formBuilder: FormBuilder, knownValidators?: Map<string, NormalizedValidator>): FormControl {
    return formBuilder.control(initialValue, knownValidators ? this.getValidators(knownValidators): []);
  }

  public getValidators(knownValidators: Map<string, NormalizedValidator>): ValidatorFn[] {

    const validators: ValidatorFn[] = [];

    if (this.validation || this.customValidation) {
      Object.entries({
        ...(this.validation ??  {}),
        ...(this.customValidation ?? {})
      }) // Combine Validation & Custom Validation Objects and Get all Entries
        .forEach(([key, value]: [string, any]) => { // Iterate over entries with key & value;
          const normalizedValidator = knownValidators.get(key);
          if (!normalizedValidator) {
            console.warn(`Unable to find validator for ${key}, skipping.`);
            return; // If no validator for given key skip.
          }

          const validator = normalizedValidator(value);
          if (!validator) return; // If validator is not valid skip;
          validators.push(validator);
        });
    }
    return validators;
  }

  public getShouldAsk(control: AbstractControl, knownConditions?: Map<string, ConditionsFunction>): boolean {
    if(!this.shouldAsk) return true;
    return this.shouldAsk.checkStatements(control, knownConditions);
  }

  public changeEvents(
    control: AbstractControl,
    knownConditions?: Map<string, ConditionsFunction>
  ): Observable<any> | undefined {
    if (!this.shouldAsk) return undefined;
    return gatherChangeEvents(control, this.shouldAsk, this.retainWhenNotAsked, knownConditions)
  }

}


