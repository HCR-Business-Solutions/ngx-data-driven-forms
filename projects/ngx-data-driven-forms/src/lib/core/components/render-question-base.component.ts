import { Component, OnInit } from '@angular/core';

@Component({
  template: ``,
  styles: [],
})
/**
 * RenderQuestionBaseComponent
 *
 * This component is not intended for use within templates and instead is intended to be extended by components.
 * This component handles rendering for questions by calling several render function on page load.
 *
 */
export class RenderQuestionBaseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  private renderLabel() {}
  private renderField() {}
  private renderHint() {}
  private renderError() {}
}
