import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Page, Section } from '../../../forms/classes';

@Component({
  template: ``,
  styles: [],
})
export class RenderHeadingBaseComponent {
  @Input() config!: Page | Section;
  @Input() control!: AbstractControl;

  constructor() {}
}
