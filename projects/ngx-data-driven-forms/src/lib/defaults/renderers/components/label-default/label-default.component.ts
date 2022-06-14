import { Component } from '@angular/core';
import { RenderLabelBaseComponent } from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-label-default',
  template: `<div class="label-container" *ngIf="this.question.label">
    <label [id]="this.fieldId + '-label'" [for]="this.fieldId">
      <markdown [data]="this.question.label"></markdown>
    </label>
  </div>`,

  styles: [],
})
export class LabelDefaultComponent extends RenderLabelBaseComponent {
  constructor() {
    super();
  }
}
