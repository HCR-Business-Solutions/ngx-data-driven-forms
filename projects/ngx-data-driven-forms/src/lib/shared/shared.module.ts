import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldDirective } from './directives';
import {QuestionErrorsComponent} from './components/question-errors';
import { AdvancedTextComponent } from './components/advanced-text';



@NgModule({
  declarations: [
    QuestionErrorsComponent,
    DynamicFieldDirective,
    AdvancedTextComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuestionErrorsComponent,
    DynamicFieldDirective,
    AdvancedTextComponent

  ]
})
export class SharedModule { }
