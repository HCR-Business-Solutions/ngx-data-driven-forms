import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderFieldBaseComponent } from './components/render-field-base/render-field-base.component';
import { RenderQuestionBaseComponent } from './components/render-question-base/render-question-base.component';



@NgModule({
  declarations: [
    RenderFieldBaseComponent,
    RenderQuestionBaseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
