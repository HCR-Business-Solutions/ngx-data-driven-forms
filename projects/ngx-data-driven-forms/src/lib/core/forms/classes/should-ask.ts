import { AbstractControl } from '@angular/forms';
import { combineLatest, map, tap, Observable, shareReplay } from 'rxjs';
import { ConditionFn } from '../../types';
import { IConditionPack, IShouldAsk } from '../interfaces';
import { ConditionPack } from './condition-pack';

export class ShouldAsk implements IShouldAsk {
  conditions: ConditionPack[];
  checkAll?: boolean | undefined;
  retain?: boolean | undefined;

  constructor(shouldAsk: IShouldAsk) {
    this.conditions = shouldAsk.conditions.map(
      (condition) => new ConditionPack(condition)
    );
    this.checkAll = shouldAsk.checkAll;
    this.retain = shouldAsk.retain;
  }

  public shouldAskWithSideEffect(
    control: AbstractControl,
    knownConditions: Map<string, ConditionFn>
  ): boolean {
    const result = this.performShouldAsk(control, knownConditions);
    if (!result) {
      if (!this.retain) {
        control.reset();
        control.markAsPristine();
        control.markAsUntouched();
      }
      control.disable();
    } else {
      control.enable();
    }
    return result;
  }

  public performShouldAsk(
    control: AbstractControl,
    knownConditions: Map<string, ConditionFn>
  ): boolean {
    for (const condition of this.conditions) {
      const result = condition.checkConditions(control, knownConditions);
      if (result && !this.checkAll) return true;
      if (!result && this.checkAll) return false;
    }
    return this.checkAll ? true : false;
  }

  public gatherChangeEvents(
    control: AbstractControl,
    knownConditions: Map<string, ConditionFn>
  ): Observable<boolean> {
    const changeEvents = this.conditions.map((condition) =>
      condition.getChangeEvents(control, knownConditions)
    );
    return combineLatest(changeEvents).pipe(
      map((pack) =>
        this.checkAll ? pack.every((val) => !!val) : pack.includes(true)
      ),
      tap((result) => {
        if (!result) {
          if (!this.retain) {
            control.reset();
            control.markAsPristine();
            control.markAsUntouched();
          }
          control.disable();
        } else {
          control.enable();
        }
      }),
      shareReplay(1)
    );
  }
}
