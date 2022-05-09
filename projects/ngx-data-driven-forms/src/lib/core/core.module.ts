import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RenderQuestionBaseComponent } from './components/render-question-base.component';
import { RenderFieldBaseComponent } from './components/render-field-base.component';

@NgModule({
  declarations: [
    RenderQuestionBaseComponent,
    RenderFieldBaseComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [],
  exports: [
    RenderQuestionBaseComponent,
    RenderFieldBaseComponent
  ],
})
export class CoreModule {}
