import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  RenderHeadingDirective,
  RenderNarrativeDirective,
  RenderQuestionDirective,
} from '../../../directives';
import { Question, Section } from '../../../forms';
import {
  ConditionsRegistryService,
  HeadingRendererRegistryService,
  NarrativeRendererRegistryService,
  QuestionRendererRegistryService,
} from '../../../services';
import { ValueOrArray } from '../../../types';
import { QuestionGroupComponent } from '../../render-helpers/question-group/question-group.component';
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
  @Input() surpressText: boolean = false;

  private shouldAsk: boolean = true;
  private shouldAskSub: Subscription | undefined = undefined;

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
    private _conditionsRegistry: ConditionsRegistryService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.shouldAsk = this.section.getShouldAskWithSideEffects(
      this.control,
      this._conditionsRegistry.getRegistry()
    );
    this.renderElements();
    if (this.section.shouldAsk) {
      this.shouldAskSub = this.section
        .getChangeEvents(this.control, this._conditionsRegistry.getRegistry())
        ?.subscribe((result) => {
          this.shouldAsk = result;
          this.renderElements();
        });
    }
  }

  ngOnDestroy(): void {
    this.clearElements();

    if (this.shouldAskSub && !this.shouldAskSub.closed) {
      this.shouldAskSub.unsubscribe();
    }
  }

  private renderElements(): void {
    this.clearElements();

    if (!this.section || !this.control || !this.shouldAsk) {
      return;
    }

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
    if (!this.headingHost || this.surpressText) return;
    const headingView = this.headingHost.viewContainerRef;
    if (!headingView) return;
    if (!this.section.title) return;

    const rendererConfig = this.section.rendererConfig?.renderers['heading'];

    if (rendererConfig?.target === 'none') {
      return;
    }

    const target = this._headingRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;
    const componentRef =
      headingView.createComponent<RenderHeadingBaseComponent>(target);
    componentRef.instance.config = this.section;
    componentRef.instance.control = this.control;
  }

  private renderNarrative(): void {
    if (!this.narrativeHost || this.surpressText) return;
    const narrativeView = this.narrativeHost.viewContainerRef;
    if (!narrativeView) return;
    if (!this.section.narrative) return;

    const rendererConfig = this.section.rendererConfig?.renderers['narrative'];

    if (rendererConfig?.target === 'none') {
      return;
    }

    const target = this._narrativeRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;
    const componentRef =
      narrativeView.createComponent<RenderNarrativeBaseComponent>(target);
    componentRef.instance.config = this.section;
    componentRef.instance.control = this.control;
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

    const renderQuestion = (question?: Question): void => {
      if (!question) return;

      const control = this.control.get(question.id);
      if (!control) return;

      const rendererConfig =
        question.rendererConfig?.renderers['question'] ?? undefined;

      if (rendererConfig?.target === 'none') {
        return;
      }

      const target = this._questionRegistry
        .getRegistry()
        .get(rendererConfig?.target ?? 'default');
      if (!target) return;
      const componentRef =
        questionView.createComponent<RenderQuestionBaseComponent>(target);
      componentRef.instance.control = control;
      componentRef.instance.isReadonly = false;
      componentRef.instance.question = question;
    };

    const renderGroup = (subLayout: ValueOrArray<string>[]) => {
      const componentRef = questionView.createComponent(QuestionGroupComponent);
      componentRef.instance.layout = subLayout;
      componentRef.instance.control = this.control;
      componentRef.instance.section = this.section;
      componentRef.instance.subLevel = 0;
    };

    this.section.layout.forEach((item: ValueOrArray<string>) => {
      if (Array.isArray(item)) {
        renderGroup(item);
      } else {
        renderQuestion(this.section.questions[item]);
      }
    });
  }
}
