import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterReigistryService, DDFormsCoreModule } from '../../core';
import * as FieldValidators from './field-validators';

@NgModule({
  declarations: [],
  imports: [CommonModule, DDFormsCoreModule],
})
export class DDFormsDefaultValidatorsModule {
  constructor(masterSvc: MasterReigistryService) {
    // #region field validators
    // #endregion field validators
  }
}
