import { ChangeDetectorRef, Component } from '@angular/core';
import {
  MasterReigistryService,
  RenderQuestionBaseComponent,
} from '../../../../core';

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
export class QuestionDefaultComponent extends RenderQuestionBaseComponent {
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdr: ChangeDetectorRef
  ) {
    super(
      masterRegistry._labelRendererRegistry,
      masterRegistry._fieldRendererRegistry,
      masterRegistry._hintRendererRegistry,
      masterRegistry._errorRendererRegistry,
      masterRegistry._conditionsRegistry,
      cdr
    );
  }
}
