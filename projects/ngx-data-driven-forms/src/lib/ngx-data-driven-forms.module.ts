import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonFieldComponent, NumberFieldComponent, QuestionComponent, TextFieldComponent} from './components';
import {CommonModule} from '@angular/common';
import { DataDrivenFormsConfig } from './module-config';
import { DynamicFieldDirective } from './directives/dynamic-field.directive';
import { QuestionErrorsComponent } from './shared';



@NgModule({
  declarations: [
    TextFieldComponent,
    QuestionComponent,
    DynamicFieldDirective,
    ButtonFieldComponent,
    QuestionErrorsComponent,
    NumberFieldComponent,
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
