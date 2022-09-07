import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderLabel]',
})
export class RenderLabelDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
