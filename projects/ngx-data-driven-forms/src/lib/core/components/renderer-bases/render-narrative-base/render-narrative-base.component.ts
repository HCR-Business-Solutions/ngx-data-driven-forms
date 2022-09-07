import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Page, Section } from '../../../forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderNarrativeBaseComponent {
  @Input() config!: Page | Section;
  @Input() control!: AbstractControl;

  constructor() {}
}
