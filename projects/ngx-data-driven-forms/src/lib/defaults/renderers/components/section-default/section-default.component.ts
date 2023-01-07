import { ChangeDetectorRef, Component } from '@angular/core';
import {
  MasterReigistryService,
  RenderSectionBaseComponent,
} from '../../../../core';

@Component({
  selector: 'ddforms-section-default',
  template: `<div
    class="section-container {{ this.classes }} {{ this.section.id }}-section"
  >
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

  get classes(): string {
    if (!this.section.customProps) return '';
    if (!this.section.customProps['classes']) return '';
    return this.section.customProps['classes'];
  }
}
