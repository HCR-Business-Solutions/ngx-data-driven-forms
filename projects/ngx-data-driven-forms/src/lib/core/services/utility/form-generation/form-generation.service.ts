import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Application, Section } from '../../../forms';
import { MasterReigistryService } from '../../registry';

@Injectable()
export class FormGenerationService {
  constructor(private masterRegistry: MasterReigistryService) {}

  public validateApplicationConfig(
    application: unknown
  ): null | { [key: string]: any } {
    return null;
  }

  public buildApplicationControl(
    initialValue: any,
    application: Application
  ): FormGroup {
    return application.asForm(
      initialValue,
      this.masterRegistry._fieldValidatorRegistry.getRegistry(),
      this.masterRegistry._crossFieldValidatorRegistry.getRegistry()
    );
  }

  public buildSectionControl(
    initialValue: any,
    section: Section,
    ignoreRepeat: boolean = false
  ): FormGroup | FormArray {
    return section.asForm(
      initialValue,
      this.masterRegistry._fieldValidatorRegistry.getRegistry(),
      this.masterRegistry._crossFieldValidatorRegistry.getRegistry(),
      ignoreRepeat
    );
  }
}
