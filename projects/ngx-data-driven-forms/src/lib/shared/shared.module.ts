import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFieldDirective } from './directives';
import {QuestionErrorsComponent, SpecialTextResolverComponent} from './components';



@NgModule({
  declarations: [
    QuestionErrorsComponent,
    DynamicFieldDirective,
    SpecialTextResolverComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    QuestionErrorsComponent,
    SpecialTextResolverComponent,
    DynamicFieldDirective,
  ]
})
export class SharedModule { }
