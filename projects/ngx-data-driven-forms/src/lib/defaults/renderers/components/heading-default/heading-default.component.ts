import { Component } from '@angular/core';
import { RenderHeadingBaseComponent } from '../../../../core';

@Component({
  selector: 'ddforms-heading-default',
  template: `<div class="heading-container" *ngIf="this.config.title">
    <markdown class="markdown" [data]="this.config.title"></markdown>
  </div>`,
  styles: [],
})
export class HeadingDefaultComponent extends RenderHeadingBaseComponent {
  constructor() {
    super();
  }
}
