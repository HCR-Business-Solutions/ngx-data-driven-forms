import { ChangeDetectorRef, Component } from '@angular/core';
import {
  MasterReigistryService,
  RenderApplicationBaseComponent,
} from '../../../../core';

@Component({
  selector: 'ddforms-application-default',
  template: `<div class="app-container">
    <ng-container ddFormsRenderPage></ng-container>
  </div>`,
  styles: [],
})
export class ApplicationDefaultComponent extends RenderApplicationBaseComponent {
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdRef: ChangeDetectorRef
  ) {
    super(masterRegistry._pageRendererRegistry, cdRef);
  }
}
