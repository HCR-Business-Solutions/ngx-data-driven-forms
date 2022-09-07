import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderPage]',
})
export class RenderPageDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
