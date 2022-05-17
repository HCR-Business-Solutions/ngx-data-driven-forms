import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  RenderHeadingDirective,
  RenderNarrativeDirective,
  RenderQuestionDirective,
} from '../../directives';
import { Section } from '../../forms';
import {
  HeadingRendererRegistryService,
  NarrativeRendererRegistryService,
  QuestionRendererRegistryService,
} from '../../services';
import { RenderHeadingBaseComponent } from '../render-heading-base';
import { RenderNarrativeBaseComponent } from '../render-narrative-base';
import { RenderQuestionBaseComponent } from '../render-question-base';

@Component({
  template: ``,
  styles: [],
})
export class RenderSectionBaseComponent implements OnInit, OnDestroy {
  @Input() section!: Section;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  @ViewChild(RenderHeadingDirective, { static: true })
  private headingHost!: RenderHeadingDirective;

  @ViewChild(RenderNarrativeDirective, { static: true })
  private narrativeHost!: RenderNarrativeDirective;

  @ViewChild(RenderQuestionDirective, { static: true })
  private questionHost!: RenderQuestionDirective;

  constructor(
    private _questionRegistry: QuestionRendererRegistryService,
    private _headingRegistry: HeadingRendererRegistryService,
    private _narrativeRegistry: NarrativeRendererRegistryService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.renderElements();
  }

  ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.clearElements();

    this.renderHeading();
    this.renderNarrative();
    this.renderQuestions();

    this._cdr.detectChanges();
  }

  private clearElements(): void {
    if (this.headingHost && this.headingHost.viewContainerRef) {
      this.headingHost.viewContainerRef.clear();
    }

    if (this.narrativeHost && this.narrativeHost.viewContainerRef) {
      this.narrativeHost.viewContainerRef.clear();
    }

    if (this.questionHost && this.questionHost.viewContainerRef) {
      this.questionHost.viewContainerRef.clear();
    }
  }

  private renderHeading(): void {
    if (!this.headingHost) return;
    const headingView = this.headingHost.viewContainerRef;
    if (!headingView) return;
    if (!this.section.title) return;

    const rendererConfig = this.section.rendererConfig?.renderers['heading'];

    const target = this._headingRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;
    const componentRef =
      headingView.createComponent<RenderHeadingBaseComponent>(target);
    componentRef.instance.content = this.section.title;
    componentRef.instance.rendererArgs = rendererConfig?.args ?? [
      'type=section',
    ];
  }

  private renderNarrative(): void {
    if (!this.narrativeHost) return;
    const narrativeView = this.narrativeHost.viewContainerRef;
    if (!narrativeView) return;
    if (!this.section.narrative) return;

    const rendererConfig = this.section.rendererConfig?.renderers['narrative'];

    const target = this._narrativeRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;
    const componentRef =
      narrativeView.createComponent<RenderNarrativeBaseComponent>(target);
    componentRef.instance.content = this.section.narrative;
    componentRef.instance.rendererArgs = rendererConfig?.args ?? [
      'type=section',
    ];
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
