import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  ButtonFieldComponent,
  NumberFieldComponent,
  QuestionComponent,
  RadioFieldComponent,
  TextFieldComponent,
} from './components';
import {CommonModule} from '@angular/common';
import {DataDrivenFormsConfig} from './module-config';
import {DynamicFieldDirective} from './directives';
import {QuestionErrorsComponent} from './shared';
import {BASE_COMPONENTS_MAP, BASE_CONDITIONS_MAP, BASE_MESSAGE_HANDLER_MAP, BASE_VALIDATORS_MAP} from './maps';
import {BASE_DATA_HANDLER_MAP} from './maps/data-handler';
import {DefaultState} from './default-state';
import { CurrencyFieldComponent } from './components/base-fields/currency-field/currency-field.component';
import { SsnFieldComponent } from './components/base-fields/ssn-field/ssn-field.component';
import { TelFieldComponent } from './components/base-fields/tel-field/tel-field.component';
import { UrlFieldComponent } from './components/base-fields/url-field/url-field.component';
import { SearchFieldComponent } from './components/base-fields/search-field/search-field.component';


@NgModule({
  declarations: [
    TextFieldComponent,
    QuestionComponent,
    DynamicFieldDirective,
    ButtonFieldComponent,
    QuestionErrorsComponent,
    NumberFieldComponent,
    RadioFieldComponent,
    CurrencyFieldComponent,
    SsnFieldComponent,
    TelFieldComponent,
    UrlFieldComponent,
    SearchFieldComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    TextFieldComponent,
    QuestionComponent,
    DynamicFieldDirective,
    ButtonFieldComponent,
    QuestionErrorsComponent,
    RadioFieldComponent,
    CurrencyFieldComponent,
    SsnFieldComponent,
    TelFieldComponent,
    UrlFieldComponent,
  ]
})
export class NgxDataDrivenFormsModule {

  constructor(@Optional() @SkipSelf() parent?: NgxDataDrivenFormsModule) {
    if (parent) {
      throw new Error(
        'NgxDataDrivenFormsModule is already loaded. Import it in the AppModule ONLY.'
      );
    }

  }

  static forRoot(config?: DataDrivenFormsConfig): ModuleWithProviders<NgxDataDrivenFormsModule> {

    const defaultState: DefaultState = {
      defaultComponents: BASE_COMPONENTS_MAP,
      defaultConditions: BASE_CONDITIONS_MAP,
      defaultDataHandlers: BASE_DATA_HANDLER_MAP,
      defaultMessageHandlers: BASE_MESSAGE_HANDLER_MAP,
      defaultValidators: BASE_VALIDATORS_MAP,
    };

    return {
      ngModule: NgxDataDrivenFormsModule,
      providers: [
        {
          provide: 'dataDrivenFormsConfig',
          useValue: config
        },
        {
          provide: 'defaultValues',
          useValue: defaultState
        }
      ]
    };
  }

}
