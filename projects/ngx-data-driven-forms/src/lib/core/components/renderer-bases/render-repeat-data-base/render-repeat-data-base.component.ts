import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Section } from '../../../forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderRepeatDataBaseComponent {
  @Input() section!: Section;
  @Input() data!: AbstractControl;

  constructor() {}
}
