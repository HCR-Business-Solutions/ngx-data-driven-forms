import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: ` <p>render-page-base works!</p> `,
  styles: [],
})
export class RenderPageBaseComponent implements OnInit {
  @Input() rendererArgs?: any[];

  constructor() {}

  ngOnInit(): void {
    throw Error('Not Implemented');
  }
}
