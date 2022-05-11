import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Question } from '../../forms/classes/question';

@Component({
  template: ` <p>render-field-base works!</p> `,
  styles: [],
})
export class RenderFieldBaseComponent {
  @Input() public fieldId!: string;
  @Input() public question!: Question;
  @Input() public control!: AbstractControl;
  @Input() public isReadonly: boolean = false;

  constructor() {}
}
