import { ChangeDetectorRef, Component } from '@angular/core';
import {
  MasterReigistryService,
  RenderSectionBaseComponent,
} from '../../../../core';

@Component({
  selector: 'ddforms-section-default',
  template: `<div class="section-container">
    <ng-container ddFormsRenderHeading></ng-container>
    <ng-container ddFormsRenderNarrative></ng-container>
    <ng-container ddFormsRenderQuestion></ng-container>
  </div>`,
  styles: [],
})
export class SectionDefaultComponent extends RenderSectionBaseComponent {
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdRef: ChangeDetectorRef
  ) {
    super(
      masterRegistry._questionRendererRegistry,
      masterRegistry._headingRendererRegistry,
      masterRegistry._narrativeRendererRegistry,
      masterRegistry._conditionsRegistry,
      cdRef
    );
  }
}
