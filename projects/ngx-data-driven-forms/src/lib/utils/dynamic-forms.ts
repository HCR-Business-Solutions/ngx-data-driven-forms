import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {combineLatest, Observable, tap} from 'rxjs';
import {Question, QuestionGroup, Statements} from '../forms-config';
import {ConditionsFunction} from '../types';
import {IQuestionPackage} from './question-package';

export class DynamicFormsUtils {

  public static gatherChangeEvents(
    control: AbstractControl,
    statements: Statements,
    shouldRetain?: boolean,
    knownConditions?: Map<string, ConditionsFunction>
  ): Observable<any> | undefined {
    const events: Observable<any>[] = [];
    events.push(statements.getValueChanges(control).pipe(
      tap(() => {

        if (!statements.checkStatements(control, knownConditions)) {
          if (!shouldRetain) {
            if (control instanceof FormControl) {
              control.setValue(null);
            } else if (control instanceof FormArray) {
              (control as FormArray).clear();
            } else if (control instanceof FormGroup) {
              (control as FormGroup).reset();
            } else {
              control.reset();
            }
            control.markAsUntouched({onlySelf: false});
            control.markAsPristine({onlySelf: false});
          }
          control.disable({onlySelf: false});
        } else {
          control.enable({onlySelf: false});
        }
        control.updateValueAndValidity({onlySelf: false});
      })
    ));
    return events.length > 0 ? combineLatest([...events]) : undefined;
  }


  public static getQuestionsAsList(questions: QuestionGroup, order?: string[]): Question[] {
    return order ?
      order.filter(key => questions[key]).map(key => questions[key]) :
      Object.values(questions);
  }

  public static getQuestionControlPair(questions: QuestionGroup, group: AbstractControl, order?: string[]): IQuestionPackage[] {
    if (!(group instanceof FormGroup)) return [];
    return DynamicFormsUtils.getQuestionsAsList(questions, order).filter(question => group.get(question.id)).map(question => ({
      control: group.get(question.id) as FormControl,
      config: question
    }));
  }

}
