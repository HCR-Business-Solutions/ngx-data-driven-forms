import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RenderFieldDirective } from '../../../directives/render-field/render-field.directive';
import { Question } from '../../../forms';
import {
  ConditionsRegistryService,
  ErrorRendererRegistryService,
  FieldRendererRegistryService,
  HintRendererRegistryService,
  LabelRendererRegistryService,
} from '../../../services';
import { RenderFieldBaseComponent } from '../render-field-base';
import { v4 as uuid } from 'uuid';
import {
  RenderErrorDirective,
  RenderHintDirective,
  RenderLabelDirective,
} from '../../../directives';
import { RenderLabelBaseComponent } from '../render-label-base';
import { RenderHintBaseComponent } from '../render-hint-base';
import { RenderErrorBaseComponent } from '../render-error-base';
import { Subscription } from 'rxjs';

@Component({
  template: ``,
  styles: [],
})
export class RenderQuestionBaseComponent implements OnInit, OnDestroy {
  @Input() question!: Question;
  @Input() control!: AbstractControl;
  @Input() public isReadonly: boolean = false;

  private shouldAsk: boolean = true;
  private shouldAskSub: Subscription | undefined = undefined;
  private internalId: string = btoa(uuid());

  @ViewChild(RenderLabelDirective, { static: true })
  private labelHost!: RenderLabelDirective;

  @ViewChild(RenderFieldDirective, { static: true })
  private fieldHost!: RenderFieldDirective;

  @ViewChild(RenderHintDirective, { static: true })
  private hintHost!: RenderHintDirective;

  @ViewChild(RenderErrorDirective, { static: true })
  private errorHost!: RenderErrorDirective;

  constructor(
    private _labelRegistry: LabelRendererRegistryService,
    private _fieldRegistry: FieldRendererRegistryService,
    private _hintRegistry: HintRendererRegistryService,
    private _errorRegistry: ErrorRendererRegistryService,
    private _conditionsRegistry: ConditionsRegistryService,
    private _cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.shouldAsk = this.question.getShouldAskWithSideEffects(
      this.control,
      this._conditionsRegistry.getRegistry()
    );
    this.renderElements();
    if (this.question.shouldAsk) {
      this.shouldAskSub = this.question
        .getChangeEvents(this.control, this._conditionsRegistry.getRegistry())
        ?.subscribe((result) => {
          this.shouldAsk = result;
          this.renderElements();
        });
    }
  }

  public ngOnDestroy(): void {
    this.clearElements();
    if (this.shouldAskSub && !this.shouldAskSub.closed) {
      this.shouldAskSub.unsubscribe();
    }
  }

  private renderElements(): void {
    this.clearElements();

    if (
      !this.question ||
      !this.control ||
      !this.shouldAsk ||
      (this.question?.isFlag ?? false)
    ) {
      return;
    }

    if (this.question.label) {
      this.renderLabel();
    }

    this.renderField();

    if (this.question.hint) {
      this.renderHint();
    }

    if (this.control.errors) {
      this.renderError();
    }
    this._cdRef.detectChanges();
  }

  private clearElements(): void {
    if (this.labelHost && this.labelHost.viewContainerRef) {
      this.labelHost.viewContainerRef.clear();
    }

    if (this.fieldHost && this.fieldHost.viewContainerRef) {
      this.fieldHost.viewContainerRef.clear();
    }

    if (this.hintHost && this.hintHost.viewContainerRef) {
      this.hintHost.viewContainerRef.clear();
    }

    if (this.errorHost && this.errorHost.viewContainerRef) {
      this.errorHost.viewContainerRef.clear();
    }
  }

  private renderLabel(): void {
    if (!this.labelHost) return;
    const labelView = this.labelHost.viewContainerRef;
    if (!labelView) return;

    if (!this.question.label) return;

    const rendererOptions =
      this.question?.rendererConfig?.renderers['label'] ?? undefined;

    if (rendererOptions?.target === 'none') {
      return;
    }

    const target: Type<RenderLabelBaseComponent> | undefined =
      this._labelRegistry
        .getRegistry()
        .get(rendererOptions?.target ?? 'default');
    if (!target) return;
    const componentRef =
      labelView.createComponent<RenderLabelBaseComponent>(target);

    componentRef.instance.fieldId = `${this.question.id}-${this.internalId}`;
    componentRef.instance.question = this.question;
    componentRef.instance.control = this.control;
  }

  private renderField(): void {
    if (!this.fieldHost) return;
    const fieldView = this.fieldHost.viewContainerRef;
    if (!fieldView) return;

    const target: Type<RenderFieldBaseComponent> | undefined =
      this._fieldRegistry.getRegistry().get(this.question.type);
    if (!target) return;

    const rendererOptions =
      this.question?.rendererConfig?.renderers['field'] ?? undefined;

    if (rendererOptions?.target === 'none') {
      return;
    }

    const componentRef =
      fieldView.createComponent<RenderFieldBaseComponent>(target);
    componentRef.instance.fieldId = `${this.question.id}-${this.internalId}`;
    componentRef.instance.question = this.question;
    componentRef.instance.control = this.control;
    componentRef.instance.isReadonly = this.isReadonly;
  }

  private renderHint(): void {
    if (!this.hintHost) return;
    const hintView = this.hintHost.viewContainerRef;
    if (!hintView) return;

    if (!this.question.hint) return;

    const rendererOptions =
      this.question?.rendererConfig?.renderers['hint'] ?? undefined;

    if (rendererOptions?.target === 'none') {
      return;
    }

    const target: Type<RenderHintBaseComponent> | undefined = this._hintRegistry
      .getRegistry()
      .get(rendererOptions?.target ?? 'default');
    if (!target) return;
    const componentRef =
      hintView.createComponent<RenderHintBaseComponent>(target);

    componentRef.instance.fieldId = `${this.question.id}-${this.internalId}`;
    componentRef.instance.question = this.question;
    componentRef.instance.control = this.control;
  }

  private renderError(): void {
    if (!this.errorHost) return;
    const errorView = this.errorHost.viewContainerRef;
    if (!errorView) return;

    const rendererOptions =
      this.question?.rendererConfig?.renderers['error'] ?? undefined;

    if (rendererOptions?.target === 'none') {
      return;
    }

    const target: Type<RenderErrorBaseComponent> | undefined =
      this._errorRegistry
        .getRegistry()
        .get(rendererOptions?.target ?? 'default');
    if (!target) return;
    const componentRef =
      errorView.createComponent<RenderErrorBaseComponent>(target);

    componentRef.instance.fieldId = `${this.question.id}-${this.internalId}`;
    componentRef.instance.control = this.control;
  }
}
