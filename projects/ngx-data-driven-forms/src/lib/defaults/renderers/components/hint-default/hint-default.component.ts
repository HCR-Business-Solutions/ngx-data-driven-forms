import { Component } from '@angular/core';
import { RenderHintBaseComponent } from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-hint-default',
  template: `<div
    [id]="this.fieldId + '-hint'"
    class="hint-container"
    *ngIf="this.question.hint"
  >
    <markdown class="markdown" [data]="this.question.hint"></markdown>
  </div>`,
  styles: [],
})
export class HintDefaultComponent extends RenderHintBaseComponent {
  constructor() {
    super();
  }
}
