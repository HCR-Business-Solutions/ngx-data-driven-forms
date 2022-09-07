import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderHeading]',
})
export class RenderHeadingDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
