import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderHint]',
})
export class RenderHintDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
