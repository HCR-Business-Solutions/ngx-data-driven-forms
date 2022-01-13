import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FieldItem, QuestionComponent, TextFieldComponent} from './components';
import {CommonModule} from '@angular/common';
import {ConditionsFunction, NormalizedValidator} from './types';
import {DynamicFieldDirective} from './directives/dynamic-field.directive';
import { ButtonFieldComponent } from './components/base-fields/button-field/button-field.component';
import { QuestionErrorsComponent } from './components/shared/question-errors/question-errors.component';

export interface DataDrivenFormsConfig {
  ignoreDefaultStyles?: boolean;
  customValidators?: Map<string, NormalizedValidator>;
  customConditions?: Map<string, ConditionsFunction>;
  customFieldComponents?: Map<string, FieldItem>;
}


@NgModule({
  declarations: [
    TextFieldComponent,
    QuestionComponent,
    DynamicFieldDirective,
    ButtonFieldComponent,
    QuestionErrorsComponent,
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
    return {
      ngModule: NgxDataDrivenFormsModule,
      providers: [
        {
          provide: 'dataDrivenFormsConfig',
          useValue: config
        }
      ]
    };
  }

}
