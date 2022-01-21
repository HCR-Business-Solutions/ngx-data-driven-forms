import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, shareReplay, skip} from 'rxjs';
import {Application} from '../forms-config';
import {AbstractControl} from '@angular/forms';
import {DataDrivenFormsService} from './data-driven-forms.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateManagerService {

  private readonly currentApplicationConfig: BehaviorSubject<Application | null | undefined> = new BehaviorSubject<Application | null | undefined>(null);
  public readonly currentApplicationConfig$: Observable<Application | null | undefined> = this.currentApplicationConfig.asObservable().pipe(
    shareReplay(0),
  );

  private readonly currentApplicationControl: BehaviorSubject<AbstractControl | null | undefined> = new BehaviorSubject<AbstractControl | null | undefined>(null);
  public readonly currentApplicationControl$: Observable<AbstractControl | null | undefined> = this.currentApplicationControl.asObservable().pipe(
    shareReplay(0),
  );

  constructor(
    private ddForms: DataDrivenFormsService
  ) { }

  public setup(initialValue: any, appConfig: unknown, skipValidation?: boolean): void {
    const config = this.ddForms.generateApplicationConfig(appConfig, skipValidation);
    const control = this.ddForms.generateApplicationControl(initialValue, config, skipValidation);
    this.currentApplicationConfig.next(config);
    this.currentApplicationControl.next(control);
  }

  public snapshot(): {config: Application | null | undefined, control: AbstractControl | null | undefined}   {
    return ({
      config: this.currentApplicationConfig.getValue(),
      control: this.currentApplicationControl.getValue(),
    });
  }



}
