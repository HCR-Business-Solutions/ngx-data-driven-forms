import { Component } from '@angular/core';
import { RenderHintBaseComponent } from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'ddforms-hint-default',
  template: `<div class="hint-container">
    <p>Default Hint Renderer</p>
  </div>`,
  styles: [],
})
export class HintDefaultComponent extends RenderHintBaseComponent {
  constructor() {
    super();
  }
}
