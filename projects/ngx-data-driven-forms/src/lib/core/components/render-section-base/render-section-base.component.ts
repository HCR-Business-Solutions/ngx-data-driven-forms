import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RenderQuestionDirective } from '../../directives';
import { Section } from '../../forms';
import { QuestionRendererRegistryService } from '../../services';
import { RenderQuestionBaseComponent } from '../render-question-base';

@Component({
  template: ``,
  styles: [],
})
export class RenderSectionBaseComponent implements OnInit, OnDestroy {
  @Input() section!: Section;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  @ViewChild(RenderQuestionDirective, { static: true })
  private questionHost!: RenderQuestionDirective;

  constructor(private _questionRegistry: QuestionRendererRegistryService) {}

  ngOnInit(): void {
    this.renderElements();
  }

  ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.clearElements();

    this.renderQuestions();
  }

  private clearElements(): void {
    if (this.questionHost && this.questionHost.viewContainerRef) {
      this.questionHost.viewContainerRef.clear();
    }
  }

  private renderQuestions(): void {
    if (!this.questionHost) return;
    const questionView = this.questionHost.viewContainerRef;
    if (!questionView) return;
    if (
      !this.section.questions ||
      !this.section.layout ||
      this.section.layout.length <= 0
    ) {
      return;
    }

    this.section.layout.forEach((key) => {
      const question = this.section.questions[key];
      if (!question) return;

      const control = this.control.get(question.id);
      if (!control) return;

      const rendererConfig =
        question.rendererConfig?.renderers['question'] ?? undefined;
      const target = this._questionRegistry
        .getRegistry()
        .get(rendererConfig?.target ?? 'default');
      if (!target) return;
      const componentRef =
        questionView.createComponent<RenderQuestionBaseComponent>(target);
      componentRef.instance.control = control;
      componentRef.instance.isReadonly = false;
      componentRef.instance.question = question;
      componentRef.instance.rendererArgs = rendererConfig?.args;
    });
  }
}
