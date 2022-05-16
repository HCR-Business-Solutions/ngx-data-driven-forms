import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Section } from '../../forms';

@Component({
  template: ` <p>render-section-base works!</p> `,
  styles: [],
})
export class RenderSectionBaseComponent {
  @Input() section!: Section;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  constructor() {}
}
