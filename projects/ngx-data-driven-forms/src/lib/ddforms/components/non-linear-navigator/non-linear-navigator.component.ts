import {Component, OnDestroy, OnInit} from '@angular/core';
import {Application, IApplicationMeta, Page, Question} from '../../../shared';
import {debounceTime, Subscription} from 'rxjs';
import {AbstractControl, FormControl} from '@angular/forms';
import {
  ApplicationStateManagerService,
  DataDrivenFormsConfigService,
  DataDrivenFormsEventsService,
  DataDrivenFormsService
} from '../../services';

// noinspection DuplicatedCode
@Component({
  selector: 'ddforms-non-linear-navigator',
  templateUrl: './non-linear-navigator.component.html',
  styleUrls: [
    './non-linear-navigator.component.scss'
  ]
})
export class NonLinearNavigatorComponent implements OnInit, OnDestroy {

  private readonly config$ = this.applicationState.currentApplicationConfig$;
  private readonly control$ = this.applicationState.currentApplicationControl$;
  private readonly meta$ = this.applicationState.currentApplicationMeta$;
  private subs: Subscription[] = [];

  meta: IApplicationMeta | null | undefined = null;
  config: Application | null | undefined = null;
  control: AbstractControl | null | undefined = null;
  public useDefaultStyles = !this.ddFormsConf.getShouldIgnoreStyles();

  pageSelectorConfig: Question | null = null;
  pageSelectorControl: FormControl = new FormControl(null);

  constructor(
    private ddForms: DataDrivenFormsService,
    private ddFormsConf: DataDrivenFormsConfigService,
    private eventSvc: DataDrivenFormsEventsService,
    private applicationState: ApplicationStateManagerService,
  ) {
  }

  public get currentPageConfig(): Page | null | undefined {

    if (!this.config || !this.control || !this.meta) return null;
    return this.config.pages[this.meta.currentPage] ?? undefined;

  }

  public get currentPageControl(): AbstractControl | null | undefined {
    if (!this.config || !this.control || !this.meta) return null;
    if (!this.currentPageConfig) return undefined;
    return this.control.get(this.currentPageConfig.id);

  }

  ngOnInit(): void {
    this.subs.push(
      this.pageSelectorControl.valueChanges.pipe(debounceTime(100)).subscribe((nextValue) => {
        if (!this.config || !this.control || !this.meta || !this.pageSelectorControl) return;
        if (nextValue === null || nextValue === undefined) return;
        const nextPageIndex = Number(nextValue) ?? null; 
        if (this.meta.currentPage === nextPageIndex) return;
        this.eventSvc.onGoTo({
          type: 'goto',
          payload: {
            targetPage: nextPageIndex ?? -1,
            currentPage: this.meta.currentPage ?? -1,
          }
        });
      })
    );
    this.subs.push(
      this.config$.subscribe(_ => {
        this.config = _;
        this.pageSelectorConfig = new Question({
          id: 'pageSelector',
          type: 'select',
          ariaLabel: 'select navigator',
          fieldConfig: {
            options: this.config?.pages.map((page, index) => ({display: page.navigationName, value: index})),
          }
        });
      })
    );
    this.subs.push(
      this.control$.subscribe(_ => this.control = _)
    );
    this.subs.push(
      this.meta$.subscribe(_ => {
        this.meta = _;
        this.pageSelectorControl.setValue(this.meta?.currentPage ?? 0, {emitEvent: false});
      })
    );
  }

  public ngOnDestroy(): void {
    this.subs.forEach(_ => !_.closed && _.unsubscribe);
  }

}
