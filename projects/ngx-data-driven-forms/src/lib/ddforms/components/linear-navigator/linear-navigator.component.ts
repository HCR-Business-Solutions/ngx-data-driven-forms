import {Component, OnDestroy, OnInit} from '@angular/core';
import {IApplicationMeta} from '../../../shared/interfaces';
import {Application, Page} from '../../../shared/form-config';
import {AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {
  ApplicationStateManagerService,
  DataDrivenFormsConfigService,
  DataDrivenFormsEventsService,
  DataDrivenFormsService
} from '../../services';

@Component({
  selector: 'ddforms-linear-navigator',
  templateUrl: './linear-navigator.component.html',
  styleUrls: [
    './linear-navigator.component.scss'
  ]
})
export class LinearNavigatorComponent implements OnInit, OnDestroy {

  private readonly config$ = this.applicationState.currentApplicationConfig$;
  private readonly control$ = this.applicationState.currentApplicationControl$;
  private readonly meta$ = this.applicationState.currentApplicationMeta$;
  useDefaultStyles = !this.ddFormsConf.getShouldIgnoreStyles();

  meta: IApplicationMeta | null | undefined = null;
  config: Application | null | undefined = null;
  control: AbstractControl | null | undefined = null;
  private subs: Subscription[] = [];

  constructor(
    private ddForms: DataDrivenFormsService,
    private ddFormsConf: DataDrivenFormsConfigService,
    private eventSvc: DataDrivenFormsEventsService,
    private applicationState: ApplicationStateManagerService,
  ) {
  }

  ngOnInit(): void {
    this.subs.push(
      this.config$.subscribe(_ => this.config = _)
    );
    this.subs.push(
      this.control$.subscribe(_ => this.control = _)
    );
    this.subs.push(
      this.meta$.subscribe(_ => this.meta = _)
    );
  }

  public ngOnDestroy(): void {
    this.subs.forEach(_ => !_.closed && _.unsubscribe);
  }

  public get lastPage(): Page | null {
    return this.lastPageRecursive();
  }

  public get showBack(): boolean {
    if (!this.meta || !this.config || !this.control) return false;
    return !!this.lastPage;
  }

  public lastPageRecursive(pageIndex?: number): Page | null {
    if (!this.meta || !this.config || !this.control) return null;
    pageIndex = pageIndex ?? this.meta.currentPage;
    if (pageIndex < 0) {
      return null;
    }

    const prevPage = this.config.pages[pageIndex - 1] ?? null;
    if (!prevPage) return null;

    const shouldAsk = this.ddForms.shouldAskPage(this.control, prevPage);
    return shouldAsk ? prevPage : this.lastPageRecursive(pageIndex - 1);
  }


  public nextPageRecursive(pageIndex?: number): Page | null {
    if (!this.meta || !this.config || !this.control) return null;
    pageIndex = pageIndex ?? this.meta.currentPage;
    const nextPage = this.config.pages[pageIndex + 1] ?? null;
    if (!nextPage) return null;

    //TODO: Perform Should Ask
    const shouldAsk = true;
    return shouldAsk ? nextPage : this.nextPageRecursive(pageIndex + 1);
  }

  public get nextPage(): Page | null {
    return this.nextPageRecursive();
  }

  public get showNext(): boolean {
    if (!this.meta || !this.config || !this.control) return false;
    return !!this.nextPage;
  }

  public get showSubmit(): boolean {
    if (!this.meta || !this.config || !this.control) return false;
    return !this.nextPage;
  }

  public onSubmit(): void {
    if (!this.config || !this.control || !this.meta) return;

    const currentPage = this.config.pages[this.meta.currentPage];

    this.eventSvc.onSubmit({
      type: 'submit',
      payload: {
        currentPage: this.meta.currentPage ?? -1,
        isPageValid: currentPage ? this.control.get(currentPage.id)?.valid ?? true : true,
        isApplicationValid: this.control.valid,
      }
    });
  }

  public onNext(): void {

    if (!this.config || !this.control || !this.meta) return;

    const nextPage = this.nextPage;
    const nextPageIndex = nextPage ? this.config.pages.findIndex(_ => nextPage.id === _.id) : null;

    this.eventSvc.onNext({
      type: 'next',
      payload: {
        currentPage: this.meta.currentPage ?? -1,
        targetPage: nextPage ? nextPageIndex ?? -1 : -1,
      }
    });
  }

  public onBack(): void {

    if (!this.config || !this.control || !this.meta) return;

    const lastPage = this.lastPage;
    const lastPageIndex = lastPage ? this.config.pages.findIndex(_ => lastPage.id === _.id) : null;

    this.eventSvc.onBack({
      type: 'back',
      payload: {
        currentPage: this.meta.currentPage ?? -1,
        targetPage: lastPageIndex !== null ? lastPageIndex ?? -1 : -1,
      }
    });
  }


}
