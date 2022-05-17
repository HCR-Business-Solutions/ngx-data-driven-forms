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
  RenderSectionDirective,
} from '../../directives';
import { Page } from '../../forms/classes/page';
import {
  HeadingRendererRegistryService,
  NarrativeRendererRegistryService,
  SectionRendererRegistryService,
  SectionRepeatRendererRegistryService,
} from '../../services';
import { RenderHeadingBaseComponent } from '../render-heading-base';
import { RenderNarrativeBaseComponent } from '../render-narrative-base';
import { RenderSectionBaseComponent } from '../render-section-base';
import { RenderSectionRepeatBaseComponent } from '../render-section-repeat-base';

@Component({
  template: ``,
  styles: [],
})
export class RenderPageBaseComponent implements OnInit, OnDestroy {
  @Input() page!: Page;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  @ViewChild(RenderHeadingDirective, { static: true })
  private headingHost!: RenderHeadingDirective;

  @ViewChild(RenderNarrativeDirective, { static: true })
  private narrativeHost!: RenderNarrativeDirective;

  @ViewChild(RenderSectionDirective, { static: true })
  private sectionHost!: RenderSectionDirective;

  constructor(
    private _sectionRegistry: SectionRendererRegistryService,
    private _repeatRegistry: SectionRepeatRendererRegistryService,
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
    this.renderSections();

    this._cdr.detectChanges();
  }

  private clearElements(): void {
    if (this.headingHost && this.headingHost.viewContainerRef) {
      this.headingHost.viewContainerRef.clear();
    }

    if (this.narrativeHost && this.narrativeHost.viewContainerRef) {
      this.narrativeHost.viewContainerRef.clear();
    }

    if (this.sectionHost && this.sectionHost.viewContainerRef) {
      this.sectionHost.viewContainerRef.clear();
    }
  }

  private renderHeading(): void {
    if (!this.headingHost) return;
    const headingView = this.headingHost.viewContainerRef;
    if (!headingView) return;
    if (!this.page.title) return;

    const rendererConfig = this.page.rendererConfig?.renderers['heading'];

    const target = this._headingRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;
    const componentRef =
      headingView.createComponent<RenderHeadingBaseComponent>(target);
    componentRef.instance.content = this.page.title;
    componentRef.instance.rendererArgs = rendererConfig?.args ?? ['type=page'];
  }

  private renderNarrative(): void {
    if (!this.narrativeHost) return;
    const narrativeView = this.narrativeHost.viewContainerRef;
    if (!narrativeView) return;
    if (!this.page.narrative) return;

    const rendererConfig = this.page.rendererConfig?.renderers['narrative'];

    const target = this._narrativeRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;
    const componentRef =
      narrativeView.createComponent<RenderNarrativeBaseComponent>(target);
    componentRef.instance.content = this.page.narrative;
    componentRef.instance.rendererArgs = rendererConfig?.args ?? ['type=page'];
  }

  private renderSections(): void {
    if (!this.sectionHost) return;
    const sectionView = this.sectionHost.viewContainerRef;
    if (!sectionView) return;

    if (!this.page.sections || this.page.sections.length < 0) return;

    this.page.sections.forEach((section) => {
      const rendererConfig =
        section.rendererConfig?.renderers['section'] ?? undefined;

      const control = this.control.get(section.id);
      if (!control) return;

      if (section.repeat) {
        const target = this._repeatRegistry
          .getRegistry()
          .get(rendererConfig?.target ?? 'default');
        if (!target) return;
        const componentRef =
          sectionView.createComponent<RenderSectionRepeatBaseComponent>(target);
        componentRef.instance.control = control;
        componentRef.instance.section = section;
        componentRef.instance.rendererArgs = rendererConfig?.args;
      } else {
        const target = this._sectionRegistry
          .getRegistry()
          .get(rendererConfig?.target ?? 'default');
        if (!target) return;
        const componentRef =
          sectionView.createComponent<RenderSectionBaseComponent>(target);
        componentRef.instance.control = control;
        componentRef.instance.section = section;
        componentRef.instance.rendererArgs = rendererConfig?.args;
      }
    });
  }
}
