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
  RenderRepeatDataDirective,
  RenderRepeatInputDirective,
} from '../../../directives';
import { Section } from '../../../forms';
import {
  CrossFieldValidatorRegistryService,
  FieldValidatorRegistryService,
  HeadingRendererRegistryService,
  NarrativeRendererRegistryService,
  RepeatDataRendererRegistryService,
  RepeatInputRendererRegistryService,
} from '../../../services';
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

  inputForm?: AbstractControl;

  constructor(
    private _repeatDataRegistry: RepeatDataRendererRegistryService,
    private _repeatInputRegistry: RepeatInputRendererRegistryService,
    private _fieldValidators: FieldValidatorRegistryService,
    private _crossFieldValidators: CrossFieldValidatorRegistryService,
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
    this.renderRepeatData();
    this.renderRepeatInput();
    this._cdr.detectChanges();
  }

  private clearElements(): void {
    if (this.inputHost && this.inputHost.viewContainerRef) {
      this.inputHost.viewContainerRef.clear();
    }

    if (this.dataHost && this.dataHost.viewContainerRef) {
      this.dataHost.viewContainerRef.clear();
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
    if (!this.narrativeHost) return;
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

  private renderRepeatInput(): void {
    if (!this.inputHost) return;
    const inputView = this.inputHost.viewContainerRef;
    if (!inputView) return;

    if (!this.inputForm) {
      this.inputForm = this.section.asFormGroup(
        null,
        this._fieldValidators.getRegistry(),
        this._crossFieldValidators.getRegistry()
      );
    }

    const rendererConfig =
      this.section.rendererConfig?.renderers['repeatInput'] ?? undefined;

    if (rendererConfig?.target === 'none') {
      return;
    }

    const target = this._repeatInputRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;

    const componentRef =
      inputView.createComponent<RenderRepeatInputBaseComponent>(target);
    componentRef.instance.inputForm = this.inputForm;
    componentRef.instance.section = this.section;
  }

  private renderRepeatData(): void {
    if (!this.dataHost) return;
    const dataView = this.inputHost.viewContainerRef;
    if (!dataView) return;

    const rendererConfig =
      this.section.rendererConfig?.renderers['repeatData'] ?? undefined;

    if (rendererConfig?.target === 'none') {
      return;
    }

    const target = this._repeatDataRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;

    const componentRef =
      dataView.createComponent<RenderRepeatDataBaseComponent>(target);

    componentRef.instance.data = this.control;
    componentRef.instance.section = this.section;
  }
}
