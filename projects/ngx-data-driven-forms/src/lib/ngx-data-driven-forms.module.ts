import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DataDrivenFormsConfig} from './module-config';
import {DynamicFieldDirective} from './directives';
import {QuestionErrorsComponent} from './shared';
import {BASE_COMPONENTS_MAP, BASE_CONDITIONS_MAP, BASE_MESSAGE_HANDLER_MAP, BASE_VALIDATORS_MAP} from './maps';
import {BASE_DATA_HANDLER_MAP} from './maps/data-handler';
import {DefaultState} from './default-state';
import {
  ApplicationComponent,
  ApplicationNavigationComponent,
  ButtonFieldComponent,
  CurrencyFieldComponent,
  NumberFieldComponent,
  PageComponent,
  QuestionComponent,
  RadioFieldComponent,
  SectionComponent,
  SectionListComponent,
  SectionListItemComponent,
  SectionSingleComponent,
  SectionTableComponent,
  SsnFieldComponent,
  TextFieldComponent,
  TelFieldComponent,
  UrlFieldComponent,
  SearchFieldComponent,
} from './components';
import { MarkdownModule } from 'ngx-markdown';


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
