import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ddFormsRenderQuestion]',
})
export class RenderQuestionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
