import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Section } from '../../forms';

@Component({
  template: ``,
  styles: [],
})
export class RenderSectionBaseComponent {
  @Input() section!: Section;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  constructor() {}
}
