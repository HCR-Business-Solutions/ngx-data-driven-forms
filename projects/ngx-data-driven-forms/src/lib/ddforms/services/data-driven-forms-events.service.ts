import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, shareReplay } from 'rxjs';

export interface DDFormsNextEvent {
  type: 'next';
  payload: {
    currentPage: number;
    nextPage: number;
    isPageValid: boolean;
  }
}

export interface DDFormsSubmitEvent {
  type: 'submit',
  payload: {
    currentPage: number;
    isPageValid: boolean;
    isApplicationValid: boolean;
  }
}

export type DDFormsEvent = DDFormsNextEvent | DDFormsSubmitEvent;

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

  public readonly events$: Observable<DDFormsEvent | null | undefined> = merge(
    this.nextEvent$,
    this.submitEvent$,
  );

  constructor() { }

  public onNext(event: DDFormsNextEvent) {
    this.nextEvent.next(event);
  }

  public onSubmit(event: DDFormsSubmitEvent) {
    this.submitEvent.next(event);
  }

}
