import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable, shareReplay } from 'rxjs';

export interface NextEvent {
  type: 'next';
  payload: {
    currentPage: number;
    nextPage: number;
    isPageValid: boolean;
  }
}

export interface SubmitEvent {
  type: 'submit',
  payload: {
    currentPage: number;
    isPageValid: boolean;
    isApplicationValid: boolean;
  }
}

export type DDFormsEvent = NextEvent | SubmitEvent;

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsEventsService {

  private readonly nextEvent: BehaviorSubject<NextEvent | null | undefined> = new BehaviorSubject<NextEvent | null | undefined>(null);
  public readonly nextEvent$: Observable<NextEvent | null | undefined> = this.nextEvent.asObservable().pipe(
    shareReplay(1),
  );

  private readonly submitEvent: BehaviorSubject<SubmitEvent | null | undefined> = new BehaviorSubject<SubmitEvent | null | undefined>(null);
  public readonly submitEvent$: Observable<SubmitEvent | null | undefined> = this.submitEvent.asObservable().pipe(
    shareReplay(1),
  );

  public readonly events$: Observable<DDFormsEvent | null | undefined> = merge(
    this.nextEvent$,
    this.submitEvent$,
  );

  constructor() { }

  public onNext(event: NextEvent) {
    this.nextEvent.next(event);
  }

  public onSubmit(event: SubmitEvent) {
    this.submitEvent.next(event);
  }

}
