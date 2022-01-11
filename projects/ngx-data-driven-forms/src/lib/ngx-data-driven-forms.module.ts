import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {QuestionComponent, TextInputComponent} from './components';

export interface DataDrivenFormsConfig {

}


@NgModule({
  declarations: [
    TextInputComponent,
    QuestionComponent,
  ],
  imports: [
    ReactiveFormsModule
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
