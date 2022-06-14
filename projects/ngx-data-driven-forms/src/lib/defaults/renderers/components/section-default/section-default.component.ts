import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MasterReigistryService,
  RenderSectionBaseComponent,
} from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'ddforms-section-default',
  template: `<div class="section-container">
    <ng-container ddFormsRenderHeading></ng-container>
    <ng-container ddFormsRenderNarrative></ng-container>
    <ng-container ddFormsRenderQuestion></ng-container>
  </div>`,
  styles: [],
})
export class SectionDefaultComponent
  extends RenderSectionBaseComponent
  implements OnInit
{
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdRef: ChangeDetectorRef
  ) {
    super(
      masterRegistry._questionRendererRegistry,
      masterRegistry._headingRendererRegistry,
      masterRegistry._narrativeRendererRegistry,
      cdRef
    );
  }
}
