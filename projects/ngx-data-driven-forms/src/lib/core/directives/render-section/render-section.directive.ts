import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderSection]',
})
export class RenderSectionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
