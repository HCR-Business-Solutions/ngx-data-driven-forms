import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderApplication]',
})
export class RenderApplicationDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
