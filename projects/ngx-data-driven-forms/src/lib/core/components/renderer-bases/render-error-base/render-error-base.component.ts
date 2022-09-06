import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Question } from '../../../forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderErrorBaseComponent {
  @Input() public fieldId!: string;
  @Input() control!: AbstractControl;

  constructor() {}
}
