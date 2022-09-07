import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderNarrative]',
})
export class RenderNarrativeDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
