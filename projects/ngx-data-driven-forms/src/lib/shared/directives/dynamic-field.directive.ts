import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ddformsDynamicField]'
})
export class DynamicFieldDirective {

  constructor(
    public viewContainerRef: ViewContainerRef,
  ) {
  }

}
