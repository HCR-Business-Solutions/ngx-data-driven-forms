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
import { RenderPageDirective } from '../../../directives';
import { Application } from '../../../forms';
import { PageRendererRegistryService } from '../../../services';
import { RenderPageBaseComponent } from '../render-page-base';

@Component({
  template: ``,
  styles: [],
})
export class RenderApplicationBaseComponent implements OnInit, OnDestroy {
  @Input() application!: Application;
  @Input() control!: AbstractControl;
  @Input() rendererArgs?: any[];

  private _currentPageIndex: number = 0;

  @Input() set currentPageIndex(value: number) {
    this._currentPageIndex = value;
    this.renderElements();
  }

  get currentPageIndex(): number {
    return this._currentPageIndex;
  }

  @ViewChild(RenderPageDirective, { static: true })
  private pageHost!: RenderPageDirective;

  constructor(
    private _pageRegistry: PageRendererRegistryService,
    private _cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.renderElements();
  }

  public ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.clearElements();

    this.renderPage();
    this._cdRef.detectChanges();
  }

  private clearElements(): void {
    if (this.pageHost && this.pageHost.viewContainerRef) {
      this.pageHost.viewContainerRef.clear();
    }
  }

  private renderPage(): void {
    if (!this.pageHost) return;
    const pageViewContainerRef = this.pageHost.viewContainerRef;
    if (!pageViewContainerRef) return;

    const page = this.application.pages[this.currentPageIndex];
    if (!page) return;

    const pageControl = this.control.get(page.id);
    if (!pageControl) return;

    const rendererOptions = page.rendererConfig?.renderers['page'] ?? undefined;

    const target: Type<RenderPageBaseComponent> | undefined = this._pageRegistry
      .getRegistry()
      .get(rendererOptions?.target ?? 'default');

    if (!target) return;

    const componentRef =
      pageViewContainerRef.createComponent<RenderPageBaseComponent>(target);

    componentRef.instance.page = page;
    componentRef.instance.control = pageControl;
    componentRef.instance.rendererArgs = rendererOptions?.args;
  }
}
