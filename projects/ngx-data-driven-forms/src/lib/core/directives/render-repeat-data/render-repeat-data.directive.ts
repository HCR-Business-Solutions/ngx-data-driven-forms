import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderRepeatData]',
})
export class RenderRepeatDataDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
