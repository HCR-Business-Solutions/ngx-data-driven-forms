import { Component } from '@angular/core';
import { RenderLabelBaseComponent } from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'ddforms-label-default',
  template: `<div class="label-container">
    <p>Default Label Renderer</p>
  </div>`,

  styles: [],
})
export class LabelDefaultComponent extends RenderLabelBaseComponent {
  constructor() {
    super();
  }
}
