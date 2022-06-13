import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Application } from '../../../forms';
import { MasterReigistryService } from '../../registry';

@Injectable()
export class FormGenerationService {
  constructor(private masterRegistry: MasterReigistryService) {}

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
}
