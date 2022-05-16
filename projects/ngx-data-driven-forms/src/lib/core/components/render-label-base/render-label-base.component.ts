import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Question } from '../../forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderLabelBaseComponent {
  @Input() public fieldId!: string;
  @Input() question!: Question;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  constructor() {}
}
