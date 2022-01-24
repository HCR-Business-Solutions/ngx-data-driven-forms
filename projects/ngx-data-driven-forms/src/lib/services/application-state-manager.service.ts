import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, skip } from 'rxjs';
import { Application } from '../forms-config';
import { AbstractControl } from '@angular/forms';
import { DataDrivenFormsService } from './data-driven-forms.service';
import { IApplicationMeta } from '../_interfaces/application-meta';

const APPLICATION_META_DEFAULT: IApplicationMeta = {
  currentPage: 0,
  isPageSubmitted: false,
  isPageValid: false,
  isApplicationSubmitted: false,
  isApplicationValid: false,
};

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateManagerService {
  private readonly currentApplicationConfig: BehaviorSubject<
    Application | null | undefined
  > = new BehaviorSubject<Application | null | undefined>(null);
  public readonly currentApplicationConfig$: Observable<
    Application | null | undefined
  > = this.currentApplicationConfig.asObservable().pipe(shareReplay(1));

  private readonly currentApplicationControl: BehaviorSubject<
    AbstractControl | null | undefined
  > = new BehaviorSubject<AbstractControl | null | undefined>(null);
  public readonly currentApplicationControl$: Observable<
    AbstractControl | null | undefined
  > = this.currentApplicationControl.asObservable().pipe(shareReplay(1));

  private readonly currentApplicationMeta: BehaviorSubject<
    IApplicationMeta | null | undefined
  > = new BehaviorSubject<IApplicationMeta | null | undefined>(null);
  public readonly currentApplicationMeta$: Observable<
    IApplicationMeta | null | undefined
  > = this.currentApplicationMeta.asObservable().pipe(shareReplay(1));

  constructor(private ddForms: DataDrivenFormsService) {}

  public setup(
    initialValue: any,
    appConfig: unknown,
    appMeta?: IApplicationMeta,
    skipValidation?: boolean
  ): void {
    const config = this.ddForms.generateApplicationConfig(
      appConfig,
      skipValidation
    );
    const control = this.ddForms.generateApplicationControl(
      initialValue,
      config,
      skipValidation
    );
    this.currentApplicationConfig.next(config);
    this.currentApplicationControl.next(control);
    this.currentApplicationMeta.next(appMeta ?? APPLICATION_META_DEFAULT);
  }

  public nextPage() {
    const currentMeta = this.currentApplicationMeta.getValue() ?? APPLICATION_META_DEFAULT;
    this.currentApplicationMeta.next({
      ...currentMeta,
      currentPage: currentMeta.currentPage + 1,
    })
  }

  public updateMeta(meta: IApplicationMeta) {
    this.currentApplicationMeta.next(meta);
  }

  public snapshot(): {
    config: Application | null | undefined;
    control: AbstractControl | null | undefined;
    meta: IApplicationMeta | null | undefined;
  } {
    return {
      config: this.currentApplicationConfig.getValue(),
      control: this.currentApplicationControl.getValue(),
      meta: this.currentApplicationMeta.getValue(),
    };
  }
}
