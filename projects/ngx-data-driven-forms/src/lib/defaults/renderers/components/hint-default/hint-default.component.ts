import { Component } from '@angular/core';
import { RenderHintBaseComponent } from '../../../../core';

@Component({
  selector: 'ddforms-hint-default',
  template: `<div
    [id]="this.fieldId + '-hint'"
    class="hint-container {{ this.question.id }}-hint"
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
