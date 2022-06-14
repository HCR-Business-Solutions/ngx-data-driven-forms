import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { RenderApplicationDirective } from '../../../directives';
import { Application } from '../../../forms';
import { ApplicationRendererRegistryService } from '../../../services';

@Component({
  selector: 'ddforms-application-container',
  template: `<ng-container ddFormsRenderApplication></ng-container>`,
  styles: [],
})
export class ApplicationContainerComponent implements OnInit, OnDestroy {
  @Input() control!: AbstractControl;
  @Input() application!: Application;

  private _currentPageIndex: number = 0;

  @Input() set currentPageIndex(value: number) {
    this._currentPageIndex = value;
    this.renderElements();
  }

  get currentPageIndex(): number {
    return this._currentPageIndex;
  }

  @ViewChild(RenderApplicationDirective, { static: true })
  private applicationHost!: RenderApplicationDirective;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _applicationRegistry: ApplicationRendererRegistryService
  ) {}

  ngOnInit(): void {
    this.renderElements();
  }

  ngOnDestroy(): void {
    this.clearElements();
  }

  private renderElements(): void {
    this.clearElements();

    this.renderApplication();

    this._cdr.detectChanges();
  }

  private clearElements(): void {
    if (this.applicationHost && this.applicationHost.viewContainerRef) {
      this.applicationHost.viewContainerRef.clear();
    }
  }

  private renderApplication(): void {
    if (!this.applicationHost) return;
    const applicationView = this.applicationHost.viewContainerRef;
    if (!applicationView) return;
    if (!this.application) return;
    if (!this.control) return;
    if (this.currentPageIndex === null || this.currentPageIndex === undefined)
      return;

    const rendererConfig =
      this.application.rendererConfig?.renderers['application'];
    const target = this._applicationRegistry
      .getRegistry()
      .get(rendererConfig?.target ?? 'default');
    if (!target) return;

    const componentRef = applicationView.createComponent(target);
    componentRef.instance.application = this.application;
    componentRef.instance.control = this.control;
    componentRef.instance.currentPageIndex = this.currentPageIndex;
  }
}
