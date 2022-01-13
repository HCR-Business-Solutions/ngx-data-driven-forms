import { Injectable } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DataDrivenFormsConfigService, DataDrivenFormsValidationService } from '.';
import { IQuestion, Question } from '..';

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsService {

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
    private ddFormsValidator: DataDrivenFormsValidationService,
    private _fb: FormBuilder,
  ) { }

  public generateQuestionConfig(question: any, skipSchemaValidation?: boolean): Question {
    const validation = !skipSchemaValidation ? this.ddFormsValidator.validateQuestion(question) : null;
    if (validation) {
      throw new Error(`Invalid question.\n${JSON.stringify(validation, null, 2)}`);
    }
    return new Question(question as IQuestion);
  }

  public generateQuestionControl(initialValue: any, question: Question, skipSchemaValidation?: boolean): FormControl{

    const validation = !skipSchemaValidation ? this.ddFormsValidator.validateQuestion(question) : null;
    if (validation) {
      throw new Error(`Invalid question.\n${JSON.stringify(validation, null, 2)}`);
    }

    return question.control(initialValue, this._fb, this.ddFormsConf.getValidators());
  }

  public getQuestionValue(control: FormControl, question: Question): any {
    const dataHandlers = this.ddFormsConf.getDataHandlers();
    const handler = dataHandlers.get(question.type);
    if (handler) {
      return handler(control.value);
    }
    return control.value;
  }

}
