import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Question } from '../../forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderHintBaseComponent {
  @Input() question!: Question;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  constructor() {}
}
