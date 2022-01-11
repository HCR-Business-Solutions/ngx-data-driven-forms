import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FieldItem, QuestionComponent, TextInputComponent} from './components';
import {CommonModule} from '@angular/common';
import {ConditionsFunction, NormalizedValidator} from './types';

export interface DataDrivenFormsConfig {
  ignoreDefaultStyles?: boolean;
  customValidators?: Map<string, NormalizedValidator>;
  customConditions?: Map<string, ConditionsFunction>;
  customFieldComponents?: Map<string, FieldItem>;
}


@NgModule({
  declarations: [
    TextInputComponent,
    QuestionComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    TextInputComponent,
    QuestionComponent
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
