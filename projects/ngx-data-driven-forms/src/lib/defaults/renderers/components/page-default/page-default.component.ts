import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MasterReigistryService,
  RenderPageBaseComponent,
} from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-page-default',
  template: `<div class="page-container">
    <p>Default Page Renderer</p>
    <ng-container ddFormsRenderHeading></ng-container>
    <ng-container ddFormsRenderNarrative></ng-container>
    <ng-container ddFormsRenderSection></ng-container>
  </div>`,
  styles: [],
})
export class PageDefaultComponent
  extends RenderPageBaseComponent
  implements OnInit
{
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdRef: ChangeDetectorRef
  ) {
    super(
      masterRegistry._sectionRendererRegistry,
      masterRegistry._sectionRepeatRendererRegistry,
      masterRegistry._headingRendererRegistry,
      masterRegistry._narrativeRendererRegistry,
      cdRef
    );
  }
}
