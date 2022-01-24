import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Application} from '../../../forms-config';
import {AbstractControl} from '@angular/forms';
import { ApplicationStateManagerService, DataDrivenFormsEventsService } from '../../../services';
import { Subscription } from 'rxjs';
import { IApplicationMeta } from '../../../_interfaces/application-meta';
import { Page } from 'ngx-data-driven-forms';

@Component({
  selector: 'ddforms-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {

  private readonly config$ = this.applicationState.currentApplicationConfig$;
  private readonly control$ = this.applicationState.currentApplicationControl$;
  private readonly meta$ = this.applicationState.currentApplicationMeta$;

  public config: Application | null | undefined;
  public control: AbstractControl | null | undefined;
  public meta: IApplicationMeta | null | undefined;

  private subs: Subscription[] = [];

  constructor(
    private applicationState: ApplicationStateManagerService,
    private eventSvc: DataDrivenFormsEventsService,
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

}
