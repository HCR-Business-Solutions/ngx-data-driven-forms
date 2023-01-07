import { Component } from '@angular/core';
import { RenderLabelBaseComponent } from '../../../../core';

@Component({
  selector: 'ddforms-label-default',
  template: `<div
    class="label-container {{ this.question.id }}-label"
    *ngIf="this.question.label"
  >
    <label [id]="this.fieldId + '-label'" [for]="this.fieldId">
      <markdown class="markdown" [data]="this.question.label"></markdown>
    </label>
  </div>`,

  styles: [],
})
export class LabelDefaultComponent extends RenderLabelBaseComponent {
  constructor() {
    super();
  }
}
