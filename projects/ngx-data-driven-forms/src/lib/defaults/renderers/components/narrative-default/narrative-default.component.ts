import { Component } from '@angular/core';
import { RenderNarrativeBaseComponent } from '../../../../core';

@Component({
  selector: 'ddforms-narrative-default',
  template: `<div class="narrative-container" *ngIf="this.config.narrative">
    <markdown class="markdown" [data]="this.config.narrative"></markdown>
  </div>`,
  styles: [],
})
export class NarrativeDefaultComponent extends RenderNarrativeBaseComponent {
  constructor() {
    super();
  }
}
