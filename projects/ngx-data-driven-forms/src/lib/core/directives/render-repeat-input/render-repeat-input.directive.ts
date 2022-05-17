import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderRepeatInput]',
})
export class RenderRepeatInputDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
