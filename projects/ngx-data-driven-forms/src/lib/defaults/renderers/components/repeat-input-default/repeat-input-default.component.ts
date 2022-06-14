import { Component, OnInit } from '@angular/core';
import { RenderRepeatInputBaseComponent } from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-repeat-input-default',
  template: `<div class="repeat-input-container">
    <p>Default Repeat Input Renderer</p>
  </div>`,
  styles: [],
})
export class RepeatInputDefaultComponent extends RenderRepeatInputBaseComponent {
  constructor() {
    super();
  }
}
