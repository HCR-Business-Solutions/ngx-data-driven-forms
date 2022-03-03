import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

import {Application, IApplication, IPage, IQuestion, ISection, Page, Question, Section} from '../../shared/form-config';
import {DataDrivenFormsConfigService} from './data-driven-forms-config.service';
import {DataDrivenFormsValidationService} from './data-driven-forms-validation.service';

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsService {

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
    private ddFormsValidator: DataDrivenFormsValidationService,
    private _fb: FormBuilder,
  ) {
  }

  //#region Question Functions

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

  public gatherQuestionEvents(control: AbstractControl, question: Question): Observable<any> | undefined {
    return question.changeEvents(control, this.ddFormsConf.getConditions());
  }

  //#endregion Question Functions


  //#region Section Functions

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
    return section.getForm(initialValue, this._fb, this.ddFormsConf.getValidators(), this.ddFormsConf.getCrossFieldValidators());
  }

  public generateSectionGroup(initialValue: any, section: Section, skipSchemaValidation?: boolean): FormGroup {
    const validation = !skipSchemaValidation ? this.ddFormsValidator.validateSection(section) : null;
    if (validation) {
      throw new Error(`Invalid Section.\n${JSON.stringify(validation, null, 2)}`);
    }
    return section.formGroup(initialValue, this._fb, this.ddFormsConf.getValidators(), this.ddFormsConf.getCrossFieldValidators());
  }

  public getSectionValue(control: AbstractControl, section: Section): { [key: string]: any } | { [key: string]: any }[] | null {
    const decodeGroup = (group: FormGroup) => {
      return Object.entries(group.controls).reduce((prev: { [key: string]: any }, [accKey, accVal]: [string, AbstractControl]) => {
        return {...prev, [`${accKey}`]: this.getQuestionValue(accVal, section.questions[accKey])};
      }, {});
    };

    if (control instanceof FormGroup) {
      return decodeGroup(control);
    } else if (control instanceof FormArray) {
      const result: { [key: string]: any }[] = [];
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

  //#endregion Section Functions


  //#region Page Functions

  public generatePageConfig(page: any, skipSchemaValidation?: boolean): Page {
    const validation = !skipSchemaValidation ? this.ddFormsValidator.validatePage(page) : null;
    if (validation) {
      throw new Error(`Invalid Page.\n${JSON.stringify(validation, null, 2)}`);
    }
    return new Page(page as IPage);
  }

  public generatePageControl(initialValue: any, page: Page, skipSchemeValidation?: boolean): FormGroup {
    const validation = !skipSchemeValidation ? this.ddFormsValidator.validatePage(page) : null;
    if (validation) {
      throw new Error(`Invalid Page.\n${JSON.stringify(validation, null, 2)}`);
    }
    return page.getForm(initialValue, this._fb, this.ddFormsConf.getValidators(), this.ddFormsConf.getCrossFieldValidators());
  }

  public getPageValue(control: AbstractControl, page: Page): { [key: string]: any } | null {
    return page.sections.reduce((prev: { [key: string]: any }, curr: Section) => {
        const sectionControl = control.get(curr.id);
        if (!sectionControl) return ({...prev});
        return ({
          ...prev,
          [`${curr.id}`]: this.getSectionValue(sectionControl, curr)
        });
      }
      , {});
  }

  public shouldAskPage(control: AbstractControl, page: Page): boolean {
    return page.getShouldAsk(control, this.ddFormsConf.getConditions());
  }

  //#endregion Page Functions


  //#region Application Functions

  public generateApplicationConfig(application: any, skipSchemeValidation?: boolean): Application {
    const validation = !skipSchemeValidation ? this.ddFormsValidator.validateApplication(application) : null;
    if (validation) {
      throw new Error(`Invalid Application.\n${JSON.stringify(validation, null, 2)}`);
    }
    return new Application(application as IApplication);
  }

  public generateApplicationControl(initialValue: any, application: Application, skipSchemeValidation?: boolean): FormGroup {
    const validation = !skipSchemeValidation ? this.ddFormsValidator.validateApplication(application) : null;
    if (validation) {
      throw new Error(`Invalid Application.\n${JSON.stringify(validation, null, 2)}`);
    }
    return application.getForm(initialValue, this._fb, this.ddFormsConf.getValidators(), this.ddFormsConf.getCrossFieldValidators());
  }

  public getApplicationValue(control: AbstractControl, application: Application): { [key: string]: any } | null {
    return application.pages.reduce((prev: { [key: string]: any }, curr: Page) => {
        const sectionControl = control.get(curr.id);
        if (!sectionControl) return ({...prev});
        return ({
          ...prev,
          [`${curr.id}`]: this.getPageValue(sectionControl, curr)
        });
      }
      , {});
  }

  //#endregion Application Functions

}
