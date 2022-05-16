import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Section } from '../../forms';

@Component({
  template: ``,
  styles: [],
})
export abstract class RenderSectionRepeatBaseComponent
  implements OnInit, OnDestroy
{
  @Input() section!: Section;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  inputForm?: AbstractControl;

  constructor() {}

  ngOnInit(): void {
    this.renderElements();
  }

  ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements() {
    this.clearElements();
  }

  private clearElements() {}
}
