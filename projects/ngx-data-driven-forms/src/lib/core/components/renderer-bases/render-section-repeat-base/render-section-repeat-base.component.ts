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
import {
  RenderErrorDirective,
  RenderHeadingDirective,
  RenderNarrativeDirective,
  RenderRepeatDataDirective,
  RenderRepeatInputDirective,
} from '../../../directives';
import { Section } from '../../../forms';
import { MasterReigistryService } from '../../../services';
import { RenderErrorBaseComponent } from '../render-error-base';
import { RenderHeadingBaseComponent } from '../render-heading-base';
import { RenderNarrativeBaseComponent } from '../render-narrative-base';
import { RenderRepeatDataBaseComponent } from '../render-repeat-data-base';
import { RenderRepeatInputBaseComponent } from '../render-repeat-input-base';

@Component({
  template: ``,
  styles: [],
})
export class RenderSectionRepeatBaseComponent implements OnInit, OnDestroy {
  @Input() section!: Section;
  @Input() control!: AbstractControl;

  @ViewChild(RenderHeadingDirective, { static: true })
  private headingHost!: RenderHeadingDirective;

  @ViewChild(RenderNarrativeDirective, { static: true })
  private narrativeHost!: RenderNarrativeDirective;

  @ViewChild(RenderRepeatInputDirective, { static: true })
  private inputHost!: RenderRepeatInputDirective;

  @ViewChild(RenderRepeatDataDirective, { static: true })
  private dataHost!: RenderRepeatDataDirective;

  @ViewChild(RenderErrorDirective, { static: true })
  private errorHost!: RenderErrorDirective;

  inputForm?: AbstractControl;

  constructor(
    private _master: MasterReigistryService,
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
    this.renderRepeatData();
    this.renderRepeatInput();
    this.renderError();
    this._cdr.detectChanges();
  }

  private clearElements(): void {
    if (this.inputHost && this.inputHost.viewContainerRef) {
      this.inputHost.viewContainerRef.clear();
    }

    if (this.dataHost && this.dataHost.viewContainerRef) {
      this.dataHost.viewContainerRef.clear();
    }

    if (this.headingHost && this.headingHost.viewContainerRef) {
      this.headingHost.viewContainerRef.clear();
    }

    if (this.narrativeHost && this.narrativeHost.viewContainerRef) {
      this.narrativeHost.viewContainerRef.clear();
    }

    if (this.errorHost && this.errorHost.viewContainerRef) {
      this.errorHost.viewContainerRef.clear();
    }
  }

  private renderHeading(): void {
    if (!this.headingHost) return;
    const headingView = this.headingHost.viewContainerRef;
    if (!headingView) return;
    if (!this.section.title) return;

    const rendererConfig = this.section.rendererConfig?.renderers['heading'];

    if (rendererConfig?.target === 'none') {
      return;
    }

    const target = this._master._headingRendererRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');

    if (!target) return;
    const componentRef =
      headingView.createComponent<RenderHeadingBaseComponent>(target);
    componentRef.instance.config = this.section;
    componentRef.instance.control = this.control;
  }

  private renderNarrative(): void {
    if (!this.narrativeHost) return;
    const narrativeView = this.narrativeHost.viewContainerRef;
    if (!narrativeView) return;
    if (!this.section.narrative) return;

    const rendererConfig = this.section.rendererConfig?.renderers['narrative'];

    if (rendererConfig?.target === 'none') {
      return;
    }

    const target = this._master._narrativeRendererRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;
    const componentRef =
      narrativeView.createComponent<RenderNarrativeBaseComponent>(target);
    componentRef.instance.config = this.section;
    componentRef.instance.control = this.control;
  }

  private renderRepeatInput(): void {
    if (!this.inputHost) return;
    const inputView = this.inputHost.viewContainerRef;
    if (!inputView) return;

    if (!this.inputForm) {
      this.inputForm = this.section.asFormGroup(
        null,
        this._master._fieldValidatorRegistry.getRegistry(),
        this._master._crossFieldValidatorRegistry.getRegistry()
      );
    }

    const rendererConfig =
      this.section.rendererConfig?.renderers['repeatInput'] ?? undefined;

    if (rendererConfig?.target === 'none') {
      return;
    }

    const target = this._master._repeatInputRendererRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;

    const componentRef =
      inputView.createComponent<RenderRepeatInputBaseComponent>(target);
    componentRef.instance.inputForm = this.inputForm;
    componentRef.instance.section = this.section;
    componentRef.instance.data = this.control;
  }

  private renderRepeatData(): void {
    if (!this.dataHost) return;
    const dataView = this.dataHost.viewContainerRef;
    if (!dataView) return;

    const rendererConfig =
      this.section.rendererConfig?.renderers['repeatData'] ?? undefined;

    if (rendererConfig?.target === 'none') {
      return;
    }

    const target = this._master._repeatDataRendererRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;

    const componentRef =
      dataView.createComponent<RenderRepeatDataBaseComponent>(target);

    componentRef.instance.data = this.control;
    componentRef.instance.section = this.section;
  }

  private renderError(): void {
    if (!this.errorHost) return;
    const errorView = this.errorHost.viewContainerRef;
    if (!errorView) return;

    const rendererOptions =
      this.section?.rendererConfig?.renderers['error'] ?? undefined;

    if (rendererOptions?.target === 'none') {
      return;
    }

    const target: Type<RenderErrorBaseComponent> | undefined =
      this._master._errorRendererRegistry
        .getRegistry()
        .get(rendererOptions?.target ?? 'default');
    if (!target) return;
    const componentRef =
      errorView.createComponent<RenderErrorBaseComponent>(target);

    componentRef.instance.fieldId = `${this.section.id}`;
    componentRef.instance.control = this.control;
  }
}
