import { Component, Input, OnInit } from '@angular/core';

@Component({
  template: ``,
  styles: [],
})
export class RenderPageBaseComponent implements OnInit {
  @Input() rendererArgs?: any[];

  constructor() {}

  ngOnInit(): void {
    throw Error('Not Implemented');
  }
}
