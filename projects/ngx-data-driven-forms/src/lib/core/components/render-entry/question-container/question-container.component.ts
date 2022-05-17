import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  Input,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RenderQuestionDirective } from '../../../directives';
import { Question } from '../../../forms';
import { QuestionRendererRegistryService } from '../../../services';

@Component({
  selector: 'ddforms-question-container',
  template: `<ng-component ddFormsRenderQuestion></ng-component>`,
  styles: [],
})
export class QuestionContainerComponent implements OnInit, OnDestroy {
  @Input() question!: Question;
  @Input() control!: AbstractControl;
  @Input() readonly: boolean = false;

  @ViewChild(RenderQuestionDirective, { static: true })
  private questionHost!: RenderQuestionDirective;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _questionRegistry: QuestionRendererRegistryService
  ) {}

  ngOnInit(): void {
    this.renderElements();
  }

  ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.clearElements();

    this.renderQuestion();

    this._cdr.detectChanges();
  }

  private clearElements(): void {
    if (this.questionHost && this.questionHost.viewContainerRef) {
      this.questionHost.viewContainerRef.clear();
    }
  }

  private renderQuestion(): void {
    if (!this.questionHost) return;
    const questionView = this.questionHost.viewContainerRef;
    if (!questionView) return;
    if (!this.question) return;
    if (!this.control) return;

    const rendererConfig =
      this.question.rendererConfig?.renderers['question'] ?? undefined;
    const target = this._questionRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;
    const componentRef = questionView.createComponent(target);
    componentRef.instance.control = this.control;
    componentRef.instance.isReadonly = this.readonly;
    componentRef.instance.question = this.question;
    componentRef.instance.rendererArgs = rendererConfig?.args;
  }
}
