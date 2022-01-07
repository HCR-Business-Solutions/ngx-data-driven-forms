import {Statements} from './statements';
import {AbstractControl, FormBuilder, FormControl, ValidatorFn} from '@angular/forms';
import {Observable} from 'rxjs';
import {ICustomValidation, IQuestion, IQuestionOption, IQuestionValidation} from '../interfaces';
import {ConditionsFunction, NormalizedValidator} from '../types';
import {DynamicFormsUtils} from '../utils';
import {BASE_VALIDATORS_MAP} from '../maps';

export class Question implements IQuestion {

  public id: string;
  public type: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'date' | 'radio';
  public label?: { text: string; shortText?: string; position?: 'before' | 'after' };
  public options?: IQuestionOption[];
  public shouldAsk?: Statements;
  public retainWhenNotAsked?: boolean;
  public validation?: IQuestionValidation;
  public customValidation?: ICustomValidation;
  public isFlag?: boolean;

  constructor(question: IQuestion) {
    this.id = question.id;
    this.type = question.type;
    this.label = question.label;
    this.options = question.options;
    this.shouldAsk = question.shouldAsk ? new Statements(question.shouldAsk) : undefined;
    this.retainWhenNotAsked = question.retainWhenNotAsked;
    this.validation = question.validation;
    this.customValidation = question.customValidation;
    this.isFlag = question.isFlag;
  }

  public control(initialValue: any, formBuilder: FormBuilder, customValidators?: Map<string, NormalizedValidator>): FormControl {
    return formBuilder.control(initialValue, this.getValidators(customValidators));
  }

  public getValidators(customValidators?: Map<string, NormalizedValidator>): ValidatorFn[] {

    const validatorMap: Map<string, NormalizedValidator> = new Map<string, NormalizedValidator>([
      ...BASE_VALIDATORS_MAP,
      ...(customValidators ?? [])
    ]);

    const validators: ValidatorFn[] = [];

    if (this.validation || this.customValidation) {
      Object.entries({
        ...(this.validation ??  {}),
        ...(this.customValidation ?? {})
      }) // Combine Validation & Custom Validation Objects and Get all Entries
        .forEach(([key, value]: [string, any]) => { // Iterate over entries with key & value;
          const normalizedValidator = validatorMap.get(key);
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

  public getShouldAsk(control: AbstractControl, customConditions?: Map<string, ConditionsFunction>): boolean {
    if(!this.shouldAsk) return true;
    return this.shouldAsk.checkStatements(control, customConditions);
  }

  public changeEvents(
    control: FormControl,
    customConditions?: Map<string, ConditionsFunction>
  ): Observable<any> | undefined {
    if (!this.shouldAsk) return undefined;
    return DynamicFormsUtils.gatherChangeEvents(control, this.shouldAsk, this.retainWhenNotAsked, customConditions)
  }

  public decodeValue(value: any) {
    if (this.options && (this.type === 'radio' || this.type === 'select')) {
      return this.options.filter(_ => _.value === value)[0]?.display ?? value;
    }
    return value;
  }

}


