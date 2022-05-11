import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderField]',
})
export class RenderFieldDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
