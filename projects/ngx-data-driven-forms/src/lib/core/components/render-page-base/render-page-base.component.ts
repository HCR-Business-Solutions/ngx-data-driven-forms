import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RenderSectionDirective } from '../../directives';
import { Page } from '../../forms/classes/page';
import {
  SectionRendererRegistryService,
  SectionRepeatRendererRegistryService,
} from '../../services';
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

  @ViewChild(RenderSectionDirective, { static: true })
  private sectionHost!: RenderSectionDirective;

  constructor(
    private _sectionRegistry: SectionRendererRegistryService,
    private _repeatRegistry: SectionRepeatRendererRegistryService,
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

    this.renderSections();
  }

  private clearElements(): void {
    if (this.sectionHost && this.sectionHost.viewContainerRef) {
      this.sectionHost.viewContainerRef.clear();
    }
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
    this._cdr.detectChanges();
  }
}
