import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageRegistryService } from '../../core';
import * as ErrorMessageFunctions from './error-messages';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DDFormsDefaultLanguageModule {
  constructor(private _errorMessage: ErrorMessageRegistryService) {
    // Register all error messages
    Object.keys(ErrorMessageFunctions).forEach((key) => {
      this._errorMessage.register(key, (ErrorMessageFunctions as any)[key]);
    });
  }
}
