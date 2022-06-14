import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RenderSectionDirective } from '../../../directives';
import { Section } from '../../../forms';
import {
  SectionRendererRegistryService,
  SectionRepeatRendererRegistryService,
} from '../../../services';
import {
  RenderSectionRepeatBaseComponent,
  RenderSectionBaseComponent,
} from '../../renderer-bases';

@Component({
  selector: 'ddforms-section-container',
  template: `<ng-component ddFormsRenderSection></ng-component>`,
  styles: [],
})
export class SectionContainerComponent implements OnInit, OnDestroy {
  @Input() section!: Section;
  @Input() control!: AbstractControl;

  @ViewChild(RenderSectionDirective, { static: true })
  private sectionHost!: RenderSectionDirective;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _sectionRegistry: SectionRendererRegistryService,
    private _repeatRegistry: SectionRepeatRendererRegistryService
  ) {}

  ngOnInit(): void {
    this.renderElements();
  }

  ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.clearElements();

    this.renderSection();

    this._cdr.detectChanges();
  }

  private clearElements(): void {
    if (this.sectionHost && this.sectionHost.viewContainerRef) {
      this.sectionHost.viewContainerRef.clear();
    }
  }

  private renderSection(): void {
    if (!this.sectionHost) return;
    const sectionView = this.sectionHost.viewContainerRef;
    if (!sectionView) return;
    if (!this.section) return;
    if (!this.control) return;
    const rendererConfig =
      this.section.rendererConfig?.renderers['section'] ?? undefined;

    if (this.section.repeat) {
      const target = this._repeatRegistry
        .getRegistry()
        .get(rendererConfig?.target ?? 'default');
      if (!target) return;
      const componentRef =
        sectionView.createComponent<RenderSectionRepeatBaseComponent>(target);
      componentRef.instance.control = this.control;
      componentRef.instance.section = this.section;
    } else {
      const target = this._sectionRegistry
        .getRegistry()
        .get(rendererConfig?.target ?? 'default');
      if (!target) return;
      const componentRef =
        sectionView.createComponent<RenderSectionBaseComponent>(target);
      componentRef.instance.control = this.control;
      componentRef.instance.section = this.section;
    }
  }
}
