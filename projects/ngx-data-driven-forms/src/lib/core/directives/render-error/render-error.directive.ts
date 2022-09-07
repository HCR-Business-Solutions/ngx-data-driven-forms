import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderError]',
})
export class RenderErrorDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
