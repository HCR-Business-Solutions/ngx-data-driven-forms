import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFieldDirective} from './directives';
import {QuestionErrorsComponent} from './components/question-errors/question-errors.component';
import {AdvancedTextComponent} from './components/advanced-text/advanced-text.component';


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
export class SharedModule {
}
