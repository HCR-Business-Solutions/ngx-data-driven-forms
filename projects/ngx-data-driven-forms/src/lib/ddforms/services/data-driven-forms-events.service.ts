import {Injectable} from '@angular/core';
import {BehaviorSubject, merge, Observable, shareReplay} from 'rxjs';

export interface DDFormsBackEvent {
  type: 'back';
  payload: {
    currentPage: number;
    targetPage: number;
    skipValidation?: boolean;
  };
}

export interface DDFormsNextEvent {
  type: 'next';
  payload: {
    currentPage: number;
    targetPage: number;
    skipValidation?: boolean;
  };
}

export interface DDFormsSubmitEvent {
  type: 'submit',
  payload: {
    currentPage: number;
    isPageValid: boolean;
    isApplicationValid: boolean;
  }
}

export type DDFormsEvent = DDFormsNextEvent | DDFormsSubmitEvent | DDFormsBackEvent;

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsEventsService {


  private readonly nextEvent: BehaviorSubject<DDFormsNextEvent | null | undefined> = new BehaviorSubject<DDFormsNextEvent | null | undefined>(null);
  public readonly nextEvent$: Observable<DDFormsNextEvent | null | undefined> = this.nextEvent.asObservable().pipe(
    shareReplay(1),
  );

  private readonly submitEvent: BehaviorSubject<DDFormsSubmitEvent | null | undefined> = new BehaviorSubject<DDFormsSubmitEvent | null | undefined>(null);
  public readonly submitEvent$: Observable<DDFormsSubmitEvent | null | undefined> = this.submitEvent.asObservable().pipe(
    shareReplay(1),
  );

  private readonly backEvent: BehaviorSubject<DDFormsBackEvent | null | undefined> = new BehaviorSubject<DDFormsBackEvent | null | undefined>(null);
  public readonly backEvent$: Observable<DDFormsBackEvent | null | undefined> = this.backEvent.asObservable().pipe(
    shareReplay(1),
  );

  public readonly events$: Observable<DDFormsEvent | null | undefined> = merge(
    this.backEvent$,
    this.nextEvent$,
    this.submitEvent$,
  );

  constructor() {
  }

  public onBack(event: DDFormsBackEvent) {
    this.backEvent.next(event);
  }

  public onNext(event: DDFormsNextEvent) {
    this.nextEvent.next(event);
  }

  public onSubmit(event: DDFormsSubmitEvent) {
    this.submitEvent.next(event);
  }

}
