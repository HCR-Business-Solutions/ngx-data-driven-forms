import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DataDrivenFormsConfig} from './module-config';
import {DynamicFieldDirective} from './directives';
import {QuestionErrorsComponent} from './shared';
import {
  BASE_COMPONENTS_MAP,
  BASE_CONDITIONS_MAP,
  BASE_CROSS_FIELD_VALIDATORS_MAP,
  BASE_MESSAGE_HANDLER_MAP,
  BASE_VALIDATORS_MAP
} from './maps';
import {BASE_DATA_HANDLER_MAP} from './maps/data-handler';
import {DefaultState} from './default-state';
import {
  ApplicationComponent,
  ApplicationNavigationComponent,
  ButtonFieldComponent,
  CheckboxFieldComponent,
  CurrencyFieldComponent,
  DateFieldComponent,
  EmailFieldComponent,
  MonthFieldComponent,
  NumberFieldComponent,
  PageComponent,
  PasswordFieldComponent,
  QuestionComponent,
  RadioFieldComponent,
  RangeFieldComponent,
  SearchFieldComponent,
  SectionComponent,
  SectionListComponent,
  SectionListItemComponent,
  SectionSingleComponent,
  SectionTableComponent,
  SsnFieldComponent,
  TelFieldComponent,
  TextareaFieldComponent,
  TextFieldComponent,
  TimeFieldComponent,
  UrlFieldComponent,
  WeekFieldComponent,
} from './components';
import {MarkdownModule} from 'ngx-markdown';
import {BASE_FIELD_CONFIG_VALIDATORS} from './maps/field-config-validators';


const FIELD_COMPONENTS = [
  TextFieldComponent,
  ButtonFieldComponent,
  NumberFieldComponent,
  RadioFieldComponent,
  CurrencyFieldComponent,
  SsnFieldComponent,
  TelFieldComponent,
  UrlFieldComponent,
  SearchFieldComponent,
  CheckboxFieldComponent,
  EmailFieldComponent,
  MonthFieldComponent,
  WeekFieldComponent,
  TimeFieldComponent,
  DateFieldComponent,
  TextareaFieldComponent,
  PasswordFieldComponent,
  RangeFieldComponent,
];

const DATA_DRIVEN_FORMS_COMPONENTS = [
  ApplicationComponent,
  ApplicationNavigationComponent,
  PageComponent,
  QuestionComponent,
  QuestionErrorsComponent,
  SectionComponent,
  SectionListComponent,
  SectionListItemComponent,
  SectionSingleComponent,
  SectionTableComponent,
];

const DIRECTIVES = [
  DynamicFieldDirective,
];

@NgModule({
  declarations: [
    ...FIELD_COMPONENTS,
    ...DATA_DRIVEN_FORMS_COMPONENTS,
    ...DIRECTIVES,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MarkdownModule.forRoot(),
  ],
  exports: [
    ...FIELD_COMPONENTS,
    ...DATA_DRIVEN_FORMS_COMPONENTS,
    ...DIRECTIVES
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
      defaultCrossFieldValidators: BASE_CROSS_FIELD_VALIDATORS_MAP,
      defaultFieldConfigValidators: BASE_FIELD_CONFIG_VALIDATORS,
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
