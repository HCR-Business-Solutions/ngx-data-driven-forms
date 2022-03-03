import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, shareReplay} from 'rxjs';
import {IQuestionOption} from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class OptionsDataService {

  private readonly optionsData: BehaviorSubject<Map<string, IQuestionOption[]> | null | undefined> = new BehaviorSubject<Map<string, IQuestionOption[]> | null | undefined>(null);
  public readonly optionsData$: Observable<Map<string, IQuestionOption[]> | null | undefined> = this.optionsData.asObservable().pipe(
    shareReplay(1),
  );

  constructor() {
  }

  registerData(key: string, data: IQuestionOption[]): void {

    const dataMap: Map<string, IQuestionOption[]> = this.optionsData.getValue() ?? new Map<string, IQuestionOption[]>();
    dataMap.set(key, data);
    this.optionsData.next(dataMap);

  }

  getKeyStream(key: string): Observable<IQuestionOption[] | null | undefined> {
    return this.optionsData$.pipe(
      map(dataMap => dataMap?.get(key) ?? null)
    );
  }

}
