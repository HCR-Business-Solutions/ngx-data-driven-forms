import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { RenderPageDirective } from '../../directives';
import { RenderPageBaseComponent } from '../render-page-base';

@Component({
  template: '',
  styles: [],
})
export class RenderApplicationBaseComponent implements OnInit, OnDestroy {
  @Input() currentPageIndex!: number;

  @ViewChild(RenderPageDirective, { static: true })
  private pageHost!: RenderPageDirective;

  constructor(private _cdRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.renderElements();
  }

  public ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.renderPage();
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

    const target: Type<RenderPageBaseComponent> | undefined = undefined;

    if (!target) return;

    const componentRef =
      pageViewContainerRef.createComponent<RenderPageBaseComponent>(target);

    this._cdRef.detectChanges();
  }
}
