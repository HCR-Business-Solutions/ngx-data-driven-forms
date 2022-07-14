import { AbstractControl } from '@angular/forms';
import { ConditionFn } from '../../types';
import { IConditionPack, IShouldAsk } from '../interfaces';

export class ShouldAsk implements IShouldAsk {
  conditions: IConditionPack[];
  checkAll?: boolean | undefined;
  retain?: boolean | undefined;

  constructor(shouldAsk: IShouldAsk) {
    this.conditions = shouldAsk.conditions.map((condition) => condition);
    this.checkAll = shouldAsk.checkAll;
    this.retain = shouldAsk.retain;
  }

  public performShouldAsk(
    control: AbstractControl,
    knownConditions: ConditionFn
  ): boolean {
    for (const condition of this.conditions) {
    }
  }
}
