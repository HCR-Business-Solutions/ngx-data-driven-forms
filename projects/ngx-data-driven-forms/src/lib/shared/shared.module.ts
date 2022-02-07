import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionErrorsComponent } from './components';
import { DynamicFieldDirective } from './directives';



@NgModule({
  declarations: [
    QuestionErrorsComponent,
    DynamicFieldDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuestionErrorsComponent,
    DynamicFieldDirective,
  ]
})
export class SharedModule { }
