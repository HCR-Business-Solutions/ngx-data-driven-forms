import { Component, OnInit } from '@angular/core';
import { RenderNarrativeBaseComponent } from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-narrative-default',
  template: `<div class="narrative-container" *ngIf="this.config.narrative">
    <markdown [data]="this.config.narrative"></markdown>
  </div>`,
  styles: [],
})
export class NarrativeDefaultComponent extends RenderNarrativeBaseComponent {
  constructor() {
    super();
  }
}
