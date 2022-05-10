import { Component, OnInit } from '@angular/core';

@Component({
  template: '',
  styles: [],
})
export class RenderQuestionBaseComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void {
    this.renderLabel();
    this.renderField();
    this.renderHint();
    this.renderError();
  }

  private renderLabel(): void {}

  private renderField(): void {}

  private renderHint(): void {}

  private renderError(): void {}

}

