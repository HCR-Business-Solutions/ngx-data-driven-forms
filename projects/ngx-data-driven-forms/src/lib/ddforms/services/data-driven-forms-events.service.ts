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

export interface DDFormsGoToEvent {
  type: 'goto';
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
    skipPageValidation?: boolean;
    skipApplicationValidation?: boolean;
  }
}

export type DDFormsEvent = DDFormsBackEvent | DDFormsNextEvent | DDFormsGoToEvent | DDFormsSubmitEvent;

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsEventsService {

  private readonly backEvent: BehaviorSubject<DDFormsBackEvent | null | undefined> = new BehaviorSubject<DDFormsBackEvent | null | undefined>(null);
  public readonly backEvent$: Observable<DDFormsBackEvent | null | undefined> = this.backEvent.asObservable().pipe(
    shareReplay(1),
  );

  private readonly nextEvent: BehaviorSubject<DDFormsNextEvent | null | undefined> = new BehaviorSubject<DDFormsNextEvent | null | undefined>(null);
  public readonly nextEvent$: Observable<DDFormsNextEvent | null | undefined> = this.nextEvent.asObservable().pipe(
    shareReplay(1),
  );

  private readonly goToEvent: BehaviorSubject<DDFormsGoToEvent | null | undefined> = new BehaviorSubject<DDFormsGoToEvent | null | undefined>(null);
  public readonly goToEvent$: Observable<DDFormsGoToEvent | null | undefined> = this.goToEvent.asObservable().pipe(
    shareReplay(1),
  );

  private readonly submitEvent: BehaviorSubject<DDFormsSubmitEvent | null | undefined> = new BehaviorSubject<DDFormsSubmitEvent | null | undefined>(null);
  public readonly submitEvent$: Observable<DDFormsSubmitEvent | null | undefined> = this.submitEvent.asObservable().pipe(
    shareReplay(1),
  );

  public readonly events$: Observable<DDFormsEvent | null | undefined> = merge(
    this.backEvent$,
    this.nextEvent$,
    this.goToEvent$,
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

  public onGoTo(event: DDFormsGoToEvent) {
    this.goToEvent.next(event);
  }

  public onSubmit(event: DDFormsSubmitEvent) {
    this.submitEvent.next(event);
  }


}
