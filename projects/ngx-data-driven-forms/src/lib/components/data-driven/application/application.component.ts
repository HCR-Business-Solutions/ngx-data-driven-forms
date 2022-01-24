import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Application, Page} from '../../../forms-config';
import {AbstractControl} from '@angular/forms';
import { ApplicationStateManagerService, DataDrivenFormsEventsService, DDFormsEvent, NextEvent, SubmitEvent, DataDrivenFormsService} from '../../../services';
import { Observable, Subscription, tap } from 'rxjs';
import { IApplicationMeta } from '../../../_interfaces/application-meta';

@Component({
  selector: 'ddforms-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {

  private readonly config$ = this.applicationState.currentApplicationConfig$;
  private readonly control$ = this.applicationState.currentApplicationControl$;
  private readonly meta$ = this.applicationState.currentApplicationMeta$;

  private readonly events$ = this.eventSvc.events$.pipe(
    tap(event => this.handleEvent(event)),
  );

  public config: Application | null | undefined;
  public control: AbstractControl | null | undefined;
  public meta: IApplicationMeta | null | undefined;

  private subs: Subscription[] = [];

  constructor(
    private applicationState: ApplicationStateManagerService,
    private eventSvc: DataDrivenFormsEventsService,
    private ddFormsSvc: DataDrivenFormsService
  ) {
  }

  public ngOnInit(): void {
    this.subs.push(
      this.config$.subscribe(_ => this.config = _)
    );
    this.subs.push(
      this.control$.subscribe(_ => this.control = _)
    );
    this.subs.push(
      this.meta$.subscribe(_ => this.meta = _)
    );
    this.subs.push(
      this.events$.subscribe()
    )
  }

  public ngOnDestroy(): void {
    this.subs.forEach(_ => !_.closed && _.unsubscribe);
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

  private handleEvent(event: DDFormsEvent | null | undefined): void {
    if (!event) return;
    if(event.type === 'next') {this.handleNextEvent(event as NextEvent); return;}
    if(event.type === 'submit') {this.handleSubmitEvent(event as SubmitEvent); return;}
  }

  private handleNextEvent(event: NextEvent): void {
    if (event.payload.currentPage < 0 || event.payload.nextPage < 0) return;
    if (event.payload.isPageValid) {
      this.applicationState.goToPage(event.payload.nextPage);
      return;
    }
    this.currentPageControl?.markAllAsTouched();
  }

  private handleSubmitEvent(event: SubmitEvent) {
    if (!this.control || !this.config) return;
    if (event.payload.currentPage < 0) return;
    if (!event.payload.isPageValid) {
      this.currentPageControl?.markAllAsTouched();
      return;
    }
    if (!event.payload.isApplicationValid) {
      this.control.markAllAsTouched();
      return;
    }
    console.log(this.ddFormsSvc.getApplicationValue(this.control, this.config));
  }

}
