import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, shareReplay} from 'rxjs';
import {AbstractControl} from '@angular/forms';
import {DataDrivenFormsService} from './data-driven-forms.service';
import {Application} from '../../shared/form-config';
import {IApplicationMeta} from '../../shared/interfaces';

const APPLICATION_META_DEFAULT: IApplicationMeta = {
  currentPage: 0,
};

@Injectable({
  providedIn: 'root',
})
export class ApplicationStateManagerService {
  private readonly currentApplicationConfig: BehaviorSubject<Application | null | undefined> = new BehaviorSubject<Application | null | undefined>(null);
  public readonly currentApplicationConfig$: Observable<Application | null | undefined> = this.currentApplicationConfig.asObservable().pipe(shareReplay(1));

  private readonly currentApplicationControl: BehaviorSubject<AbstractControl | null | undefined> = new BehaviorSubject<AbstractControl | null | undefined>(null);
  public readonly currentApplicationControl$: Observable<AbstractControl | null | undefined> = this.currentApplicationControl.asObservable().pipe(shareReplay(1));

  private readonly currentApplicationMeta: BehaviorSubject<IApplicationMeta | null | undefined> = new BehaviorSubject<IApplicationMeta | null | undefined>(null);
  public readonly currentApplicationMeta$: Observable<IApplicationMeta | null | undefined> = this.currentApplicationMeta.asObservable().pipe(shareReplay(1));

  private readonly lastValidValue: BehaviorSubject<any | null | undefined> =
    new BehaviorSubject<any | null | undefined>(null);

  constructor(private ddForms: DataDrivenFormsService) {
  }

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
    this.lastValidValue.next(this.ddForms.getApplicationValue(control, config));
  }

  public goToPage(targetPageIndex: number, skipValidation?: boolean) {
    const currentPageIndex =
      this.currentApplicationMeta.getValue()?.currentPage ?? null;
    const config = this.currentApplicationConfig.getValue() ?? null;
    const control = this.currentApplicationControl.getValue() ?? null;


    if (control === null || currentPageIndex === null || config === null) {
      return;
    }

    if (currentPageIndex < 0) {
      this.currentApplicationMeta.next({
        currentPage: targetPageIndex,
      });
      this.lastValidValue.next(
        this.ddForms.getApplicationValue(control, config)
      );
    }

    const currentPage = control.get(config.pages[currentPageIndex].id) ?? null;
    const valid = skipValidation || !currentPage ? true : currentPage.valid;


    if (valid) {
      this.currentApplicationMeta.next({
        currentPage: targetPageIndex,
      });
      this.lastValidValue.next(
        this.ddForms.getApplicationValue(control, config)
      );
    }
  }

  public resetControl() {
    const control = this.currentApplicationControl.getValue() ?? null;
    const lastValidValue = this.lastValidValue.getValue() ?? null;

    if (control === null || lastValidValue === null) return;
    control.patchValue(lastValidValue, {emitEvent: false});

  }

  public refreshMeta() {
    this.currentApplicationMeta.next(this.currentApplicationMeta.getValue());
  }

  public snapshot(): {
    config: Application | null | undefined;
    control: AbstractControl | null | undefined;
    meta: IApplicationMeta | null | undefined;
    lastValidValue: any | null | undefined;
  } {
    return {
      config: this.currentApplicationConfig.getValue(),
      control: this.currentApplicationControl.getValue(),
      meta: this.currentApplicationMeta.getValue(),
      lastValidValue: this.lastValidValue.getValue(),
    };
  }

}
