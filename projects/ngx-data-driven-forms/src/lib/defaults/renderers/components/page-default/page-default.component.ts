import { ChangeDetectorRef, Component } from '@angular/core';
import {
  MasterReigistryService,
  RenderPageBaseComponent,
} from '../../../../core';

@Component({
  selector: 'ddforms-page-default',
  template: `<div
    class="page-container"
    [ngClass]="this.page.id + '-page ' + this.classes"
  >
    <form>
      <ng-container ddFormsRenderHeading></ng-container>
      <ng-container ddFormsRenderNarrative></ng-container>
      <ng-container ddFormsRenderSection></ng-container>
    </form>
  </div>`,
  styles: [],
})
export class PageDefaultComponent extends RenderPageBaseComponent {
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdRef: ChangeDetectorRef
  ) {
    super(
      masterRegistry._sectionRendererRegistry,
      masterRegistry._sectionRepeatRendererRegistry,
      masterRegistry._headingRendererRegistry,
      masterRegistry._narrativeRendererRegistry,
      masterRegistry._conditionsRegistry,
      cdRef
    );
  }

  get classes(): string {
    if (!this.page.customProps) return '';
    if (!this.page.customProps['classes']) return '';
    return this.page.customProps['classes'];
  }
}
