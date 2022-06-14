import { Component, OnInit } from '@angular/core';
import { RenderRepeatDataBaseComponent } from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-repeat-data-default',
  template: `<div class="repeat-data-container">
    <p>Default Repeat Data Renderer</p>
  </div>`,
  styles: [],
})
export class RepeatDataDefaultComponent extends RenderRepeatDataBaseComponent {
  constructor() {
    super();
  }
}
