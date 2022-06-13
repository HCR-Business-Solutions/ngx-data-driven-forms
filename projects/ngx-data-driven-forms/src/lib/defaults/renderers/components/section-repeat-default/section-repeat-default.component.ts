import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MasterReigistryService,
  RenderSectionRepeatBaseComponent,
} from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'ddforms-section-repeat-default',
  template: `<div class="section-repeat-container">
    <p>Default Section Repeat Renderer</p>
    <ng-container ddFormsRenderHeading></ng-container>
    <ng-container ddFormsRenderNarrative></ng-container>
    <ng-container ddFormsRenderRepeatInput></ng-container>
    <ng-container ddFormsRenderRepeatData></ng-container>
  </div>`,
  styles: [],
})
export class SectionRepeatDefaultComponent
  extends RenderSectionRepeatBaseComponent
  implements OnInit
{
  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdr: ChangeDetectorRef
  ) {
    super(
      masterRegistry._repeatDataRendererRegistry,
      masterRegistry._repeatInputRendererRegistry,
      masterRegistry._fieldValidatorRegistry,
      masterRegistry._crossFieldValidatorRegistry,
      masterRegistry._headingRendererRegistry,
      masterRegistry._narrativeRendererRegistry,
      cdr
    );
  }
}
