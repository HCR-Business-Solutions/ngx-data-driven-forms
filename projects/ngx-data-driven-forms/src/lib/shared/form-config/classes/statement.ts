import {AbstractControl} from '@angular/forms';
import {IConditions, ICustomConditions, IStatement} from '../interfaces';
import {ConditionsFunction} from '../../types';

export class Statement implements IStatement {

  public sibling: string;
  public expectedParentLevel: number;
  public conditions?: IConditions;
  public customConditions?: ICustomConditions;
  public check?: 'one' | 'all';

  constructor(statement: IStatement) {

    this.sibling = statement.sibling;
    this.expectedParentLevel = statement.expectedParentLevel;
    this.conditions = statement.conditions;
    this.customConditions = statement.customConditions;
    this.check = statement.check;

  }

  public getArgControl(control: AbstractControl): AbstractControl | null {

    let sibling: AbstractControl | null;

    let check: AbstractControl | null = control;
    for (let i = 0; i < this.expectedParentLevel && check !== null; i++) {
      check = check.parent;
    }

    sibling = check?.get(this.sibling) ?? null;


    if (sibling === null) {
      console.warn(`Statement could not parse arg of ${sibling} on control: `, control);
    }
    return sibling !== null ? sibling : null;

  }

  public checkStatement(argValue: any, knownConditions?: Map<string, ConditionsFunction>): boolean {

    const conditionsMap = new Map<string, ConditionsFunction>([
      ...(knownConditions ?? [])
    ]);

    let conditionResults: (boolean | undefined)[] = [];

    if (this.conditions || this.customConditions) {
      Object.entries({
        ...(this.conditions ?? {}),
        ...(this.customConditions ?? {})
      }) // Combine conditions and custom conditions and get their entries.
        .forEach(([key, compareValue]: [string, any]) => { // Iterate over entries with key and compare value.
          const conditionFunction = conditionsMap.get(key);
          if (!conditionFunction) {
            console.warn(`Condition ${key} does not have a registered evaluation function, skipping.`);
            return; // If no condition function found skip;
          }
          conditionResults.push(conditionFunction(argValue, compareValue)); // Run condition and push results.
        });
    }

    conditionResults = conditionResults.filter(_ => _ !== undefined); // Remove any undefined (not needed for check.
    return this.check === 'one' ?
      conditionResults.includes(true) : // If check is explicitly 'one' see if any are true.
      conditionResults.every(_ => _); // default check; makes sure all items are true.

  }

}
