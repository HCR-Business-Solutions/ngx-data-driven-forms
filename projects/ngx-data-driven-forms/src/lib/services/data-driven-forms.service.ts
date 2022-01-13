import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, NgControlStatus } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataDrivenFormsConfigService, DataDrivenFormsValidationService } from '.';
import { IQuestion, ISection, Question, Section } from '..';

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsService {

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
    private ddFormsValidator: DataDrivenFormsValidationService,
    private _fb: FormBuilder,
  ) { }

  // #region Question Functions

  public generateQuestionConfig(question: any, skipSchemaValidation?: boolean): Question {
    const validation = !skipSchemaValidation ? this.ddFormsValidator.validateQuestion(question) : null;
    if (validation) {
      throw new Error(`Invalid Question.\n${JSON.stringify(validation, null, 2)}`);
    }
    return new Question(question as IQuestion);
  }

  public generateQuestionControl(initialValue: any, question: Question, skipSchemaValidation?: boolean): FormControl {

    const validation = !skipSchemaValidation ? this.ddFormsValidator.validateQuestion(question) : null;
    if (validation) {
      throw new Error(`Invalid Question.\n${JSON.stringify(validation, null, 2)}`);
    }

    return question.control(initialValue, this._fb, this.ddFormsConf.getValidators());
  }

  public getQuestionValue(control: AbstractControl, question?: Question): any {
    const dataHandlers = this.ddFormsConf.getDataHandlers();
    const handler = dataHandlers.get(question?.type ?? '');
    if (handler) {
      return handler(control.value);
    }
    return control.value;
  }

  public shouldAskQuestion(control: AbstractControl, question: Question): boolean {
    return question.getShouldAsk(control, this.ddFormsConf.getConditions());
  }

  public gatherQuestionEvents(control: FormControl, question: Question): Observable<any> | undefined {
    return question.changeEvents(control, this.ddFormsConf.getConditions());
  }

  // #endregion Question Functions


  // #region Section Functions

  public generateSectionConfig(section: any, skipSchemaValidation?: boolean): Section {
    const validation = !skipSchemaValidation ? this.ddFormsValidator.validateSection(section) : null;
    if (validation) {
      throw new Error(`Invalid Section.\n${JSON.stringify(validation, null, 2)}`);
    }
    return new Section(section as ISection);
  }

  public generateSectionControl(initialValue: any, section: Section, skipSchemaValidation?: boolean): FormGroup | FormArray {
    const validation = !skipSchemaValidation ? this.ddFormsValidator.validateSection(section) : null;
    if (validation) {
      throw new Error(`Invalid Section.\n${JSON.stringify(validation, null, 2)}`);
    }
    return section.getForm(initialValue, this._fb, this.ddFormsConf.getValidators());
  }

  public generateSectionGroup(initialValue: any, section: Section, skipSchemaValidation?: boolean): FormGroup {
    const validation = !skipSchemaValidation ? this.ddFormsValidator.validateSection(section) : null;
    if (validation) {
      throw new Error(`Invalid Section.\n${JSON.stringify(validation, null, 2)}`);
    }
    return section.formGroup(initialValue, this._fb, this.ddFormsConf.getValidators());
  }

  public getSectionValue(control: AbstractControl, section: Section): {[key: string]: any} | {[key: string]: any}[] | null {
    const decodeGroup = (group: FormGroup) => {
      return Object.entries(group.controls).reduce((prev: {[key: string]: any}, [accKey, accVal]: [string, AbstractControl]) => {
        return {...prev, [`${accKey}`]: this.getQuestionValue(accVal, section.questions[accKey])}
      }, {});
    }

    if (control instanceof FormGroup) {
      return decodeGroup(control);
    } else if (control instanceof FormArray) {
      const result: {[key: string]: any}[] = [];
      control.controls.forEach(control => result.push(decodeGroup(control as FormGroup)));
      return result;
    }

    return null;

  }

  public shouldAskSection(control: AbstractControl, section: Section): boolean {
    return section.getShouldAsk(control, this.ddFormsConf.getConditions());
  }

  public gatherSectionEvents(control: AbstractControl, section: Section): Observable<any> | undefined {
    return section.changeEvents(control, this.ddFormsConf.getConditions());
  }

  // #endregion Section Functions


  // #region Page Functions
  // #endregion Page Functions


  // #region Application Functions
  // #endregion Application Functions

}
