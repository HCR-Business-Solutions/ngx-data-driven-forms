import { Component } from '@angular/core';
import { RenderLabelBaseComponent } from 'ngx-data-driven-forms/src/lib/core';

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
