import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

export interface NextEvent {
  type: 'next';
  payload: {
    currentPage: number;
    nextPage: number;
    isPageValid: boolean;
  }
}

export type DDFormsEvent = NextEvent;

@Injectable({
  providedIn: 'root'
})
export class DataDrivenFormsEventsService {

  private readonly nextEvent: BehaviorSubject<DDFormsEvent | null | undefined> = new BehaviorSubject<DDFormsEvent | null | undefined>(null);
  public readonly nextEvent$: Observable<DDFormsEvent | null | undefined> = this.nextEvent.asObservable().pipe(
    shareReplay(1),
  );

  constructor() { }

  public onNext(event: NextEvent) {
    this.nextEvent.next(event);
  }

}
