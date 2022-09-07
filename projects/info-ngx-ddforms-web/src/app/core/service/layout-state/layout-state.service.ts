import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutStateService {
  private readonly toolbarVisible: BehaviorSubject<boolean | undefined> =
    new BehaviorSubject<boolean | undefined>(false);
  public readonly toolbarVisible$: Observable<boolean | undefined> =
    this.toolbarVisible.asObservable().pipe(shareReplay(1));

  constructor() {}

  public hideToolbar(): void {
    this.toolbarVisible.next(false);
  }

  public showToolbar(): void {
    this.toolbarVisible.next(true);
  }
}
