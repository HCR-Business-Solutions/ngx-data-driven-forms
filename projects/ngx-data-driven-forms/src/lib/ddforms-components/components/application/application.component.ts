import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { ApplicationStateManagerService, DataDrivenFormsEventsService, DataDrivenFormsService, DDFormsEvent, NextEvent, SubmitEvent } from '../../../ddforms/services';
import { Application, Page } from '../../../shared/form-config';
import { IApplicationMeta } from '../../../shared/interfaces';

@Component({
  selector: 'ddforms-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit, OnDestroy {


  @Input() public config: Application | null | undefined;
  @Input() public control: AbstractControl | null | undefined;
  @Input() public meta: IApplicationMeta | null | undefined;


  constructor() {
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
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
