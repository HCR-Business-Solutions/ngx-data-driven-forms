import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MasterReigistryService,
  RenderQuestionBaseComponent,
} from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-question-default',
  template: `<div
    class="question-container form-field field-{{ this.question.type }}"
  >
    <ng-container ddFormsRenderLabel></ng-container>
    <ng-container ddFormsRenderField></ng-container>
    <ng-container ddFormsRenderHint></ng-container>
    <ng-container ddFormsRenderError></ng-container>
  </div>`,
  styles: [],
})
export class QuestionDefaultComponent
  extends RenderQuestionBaseComponent
  implements OnInit
{
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdr: ChangeDetectorRef
  ) {
    super(
      masterRegistry._labelRendererRegistry,
      masterRegistry._fieldRendererRegistry,
      masterRegistry._hintRendererRegistry,
      masterRegistry._errorRendererRegistry,
      cdr
    );
  }
}
