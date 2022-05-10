import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  template: ` <p>render-field-base works!</p> `,
  styles: [],
})
export class RenderFieldBaseComponent {
  // @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;
  @Input() public isReadonly: boolean = false;

  constructor() {}
}
