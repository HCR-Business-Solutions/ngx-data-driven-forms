import { Component, Input } from '@angular/core';

@Component({
  template: ``,
  styles: [],
})
export class RenderHeadingBaseComponent {
  @Input() content!: string;
  @Input() rendererArgs?: any[];

  constructor() {}
}
