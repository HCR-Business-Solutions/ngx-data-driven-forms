import { Component, OnInit } from '@angular/core';
import { RenderHeadingBaseComponent } from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-heading-default',
  template: `<div class="heading-container">
    <p>Default Heading Renderer</p>
  </div>`,
  styles: [],
})
export class HeadingDefaultComponent extends RenderHeadingBaseComponent {
  constructor() {
    super();
  }
}
