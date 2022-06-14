import { ChangeDetectorRef, Component } from '@angular/core';
import {
  MasterReigistryService,
  RenderErrorBaseComponent,
} from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-error-default',
  template: `<div class="errors-container">
    <p>Default Errors Renderer</p>
  </div>`,
  styles: [],
})
export class ErrorDefaultComponent extends RenderErrorBaseComponent {
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdr: ChangeDetectorRef
  ) {
    super();
  }
}
