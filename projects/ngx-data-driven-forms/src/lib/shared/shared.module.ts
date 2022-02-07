import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionErrorsComponent } from './components/question-errors/question-errors.component';



@NgModule({
  declarations: [
    QuestionErrorsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuestionErrorsComponent,
  ]
})
export class SharedModule { }
