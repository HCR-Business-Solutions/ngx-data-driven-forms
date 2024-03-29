import { Injectable } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { Application, Page, Question, Section } from '../../forms';
import { MasterReigistryService } from '../registry';

@Injectable()
export class FormGenerationService {
  constructor(private masterRegistry: MasterReigistryService) {}

  public buildApplicationControl(
    initialValue: any,
    application: Application
  ): UntypedFormGroup {
    return application.asForm(
      initialValue,
      this.masterRegistry._fieldValidatorRegistry.getRegistry(),
      this.masterRegistry._crossFieldValidatorRegistry.getRegistry()
    );
  }

  public buildPageControl(initialValue: any, page: Page): UntypedFormGroup {
    return page.asForm(
      initialValue,
      this.masterRegistry._fieldValidatorRegistry.getRegistry(),
      this.masterRegistry._crossFieldValidatorRegistry.getRegistry()
    );
  }

  public buildSectionControl(
    initialValue: any,
    section: Section,
    ignoreRepeat: boolean = false
  ): UntypedFormGroup | UntypedFormArray {
    return section.asForm(
      initialValue,
      this.masterRegistry._fieldValidatorRegistry.getRegistry(),
      this.masterRegistry._crossFieldValidatorRegistry.getRegistry(),
      ignoreRepeat
    );
  }

  public buildQuestionControl(
    initialValue: any,
    question: Question
  ): UntypedFormControl {
    return question.control(
      initialValue,
      this.masterRegistry._fieldValidatorRegistry.getRegistry()
    );
  }
}
