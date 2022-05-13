import { Component, OnInit } from '@angular/core';

@Component({
  template: ` <p>render-page-base works!</p> `,
  styles: [],
})
export class RenderPageBaseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    throw Error('Not Implemented');
  }
}
