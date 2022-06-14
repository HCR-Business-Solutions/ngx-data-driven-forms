import { Component, OnInit } from '@angular/core';
import { RenderNarrativeBaseComponent } from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-narrative-default',
  template: `<div class="narrative-container">
    <p>Default Narrative Renderer</p>
  </div>`,
  styles: [],
})
export class NarrativeDefaultComponent extends RenderNarrativeBaseComponent {
  constructor() {
    super();
  }
}
