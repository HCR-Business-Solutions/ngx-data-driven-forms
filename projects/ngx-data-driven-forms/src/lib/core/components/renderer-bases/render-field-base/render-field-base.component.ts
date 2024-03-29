import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Question } from '../../../forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderFieldBaseComponent {
  @Input() public fieldId!: string;
  @Input() public question!: Question;
  @Input() public control!: AbstractControl;
  @Input() public isReadonly: boolean = false;

  constructor() {}
}
