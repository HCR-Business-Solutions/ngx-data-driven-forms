import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MasterReigistryService,
  RenderApplicationBaseComponent,
} from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-application-default',
  template: `<div class="app-container">
    <ng-container ddFormsRenderPage></ng-container>
  </div>`,
  styles: [],
})
export class ApplicationDefaultComponent
  extends RenderApplicationBaseComponent
  implements OnInit
{
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdRef: ChangeDetectorRef
  ) {
    super(masterRegistry._pageRendererRegistry, cdRef);
  }
}
