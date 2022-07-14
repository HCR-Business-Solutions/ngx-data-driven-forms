import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConditionFn } from '../../types';
import { IConditionPack } from '../interfaces';

export class ConditionPack implements IConditionPack {
  sibling: string;
  expectedParentLevel: number;
  conditions: { [key: string]: any };
  checkAll?: boolean | undefined;

  constructor(conditionPack: IConditionPack) {
    this.sibling = conditionPack.sibling;
    this.expectedParentLevel = conditionPack.expectedParentLevel;
    this.conditions = conditionPack.conditions;
    this.checkAll = conditionPack.checkAll;
  }

  private getTarget(
    control: AbstractControl | null,
    currentLevel: number = 0
  ): AbstractControl | null {
    if (!control || currentLevel > this.expectedParentLevel) return null;
    if (currentLevel === this.expectedParentLevel)
      return control.get(this.sibling) ?? null;
    return this.getTarget(control?.parent ?? null, currentLevel + 1);
  }

  public checkConditions(
    control: AbstractControl,
    knownConditions: Map<string, ConditionFn>
  ): boolean {
    const sibling = this.getTarget(control);
    if (!sibling) {
      throw new Error(
        `Unable to find sibling with key ${this.sibling} at ${this.expectedParentLevel}`
      );
    }
    for (const [condition, value] of Object.entries(this.conditions)) {
      const conditionFn = knownConditions.get(condition) ?? undefined;
      if (!conditionFn) {
        console.warn(
          `Unable to find condition function with key '${condition}'.`
        );
        continue;
      }
      const result = conditionFn(sibling?.value ?? undefined, value);
      if (result && !this.checkAll) return true;
      if (!result && this.checkAll) return false;
    }
    return this.checkAll ? true : false;
  }

  public getChangeEvents(): Observable<boolean> {}
}
