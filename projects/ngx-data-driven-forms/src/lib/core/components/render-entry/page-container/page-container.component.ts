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
import { Page } from '../../../forms';
import { PageRendererRegistryService } from '../../../services';
import { RenderPageBaseComponent } from '../../renderer-bases';

@Component({
  selector: 'ddforms-page-container',
  template: `<ng-component ddFormsRenderPage></ng-component>`,
  styles: [],
})
export class PageContainerComponent implements OnInit, OnDestroy {
  @Input() page!: Page;
  @Input() control!: AbstractControl;

  @ViewChild(RenderPageDirective, { static: true })
  private pageHost!: RenderPageDirective;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _pageRegistry: PageRendererRegistryService
  ) {}

  ngOnInit(): void {
    this.renderElements();
  }

  ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.clearElements();

    this.renderPage();

    this._cdr.detectChanges();
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

    if (!this.page) return;
    if (!this.control) return;

    const rendererOptions =
      this.page.rendererConfig?.renderers['page'] ?? undefined;

    const target: Type<RenderPageBaseComponent> | undefined = this._pageRegistry
      .getRegistry()
      .get(rendererOptions?.target ?? 'default');

    if (!target) return;

    const componentRef =
      pageViewContainerRef.createComponent<RenderPageBaseComponent>(target);

    componentRef.instance.page = this.page;
    componentRef.instance.control = this.control;
  }
}
