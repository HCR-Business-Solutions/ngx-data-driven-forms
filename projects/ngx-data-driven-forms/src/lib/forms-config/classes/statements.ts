import {Statement} from './statement';
import {AbstractControl} from '@angular/forms';
import {combineLatest} from 'rxjs';
import {IStatements} from '../interfaces';
import {ConditionsFunction} from '../../types';

export class Statements implements IStatements {
  public check?: 'one' | 'all';
  public statements: Statement[];

  constructor(statements: IStatements) {
    this.check = statements.check;
    this.statements = statements.statements.map(_ => new Statement(_));
  }

  public getControls(control: AbstractControl): (AbstractControl | null)[] {
    return this.statements.map(_ => _.getArgControl(control));
  }

  public getValueChanges(control: AbstractControl) {
    return combineLatest([...(this.getControls(control).filter(_ => _ !== null).map(_ => _?.valueChanges))]);
  }

  public checkStatements(control: AbstractControl, customConditions?: Map<string, ConditionsFunction>) {
    const statementChecks = this.statements.map(statement => {
      const statementControl = statement.getArgControl(control);
      const statementValue = statementControl ? statementControl.value : null;
      return statement.checkStatement(statementValue, customConditions);
    });

    return this.check === 'one' ?
      statementChecks.includes(true) : // If check is explicitly 'one' see if any are true.
      statementChecks.every(_ => _); // default check; makes sure all items are true.

  }

}
