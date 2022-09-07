import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderErrorBaseComponent {
  @Input() public fieldId!: string;
  @Input() control!: AbstractControl;

  constructor() {}
}
