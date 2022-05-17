import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Section } from '../../forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderRepeatInputBaseComponent {
  @Input() section!: Section;
  @Input() inputForm!: AbstractControl;
  @Input() rendererArgs?: any[];
}
