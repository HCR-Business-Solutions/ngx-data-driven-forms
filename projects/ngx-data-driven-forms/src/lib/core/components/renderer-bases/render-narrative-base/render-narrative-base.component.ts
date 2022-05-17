import { Component, Input } from '@angular/core';

@Component({
  template: ``,
  styles: [],
})
export class RenderNarrativeBaseComponent {
  @Input() content!: string;
  @Input() rendererArgs?: any[];

  constructor() {}
}
