import {Statements} from './statements';
import {QuestionGroup} from './question-group';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {combineLatest, Observable} from 'rxjs';
import {Question} from './question';
import {ISection} from '../interfaces';
import {ConditionsFunction, NormalizedValidator} from '../../types';
import {DynamicFormsUtils} from '../../utils';

export class Section implements ISection {

  public id: string;
  public title?: string;
  public border?: boolean;

  public narrative?: string;

  public questions: QuestionGroup;
  public questionOrder: string[];

  public repeat?: {
    style: 'list' | 'table';
    itemName?: string;
    minEntries?: number;
    maxEntries?: number
  };
  public shouldAsk?: Statements;
  public retainWhenNotAsked?: boolean;

  constructor(section: ISection) {
    this.id = section.id;
    this.title = section.title;
    this.border = section.border;

    this.narrative = section.narrative;

    this.questions = new QuestionGroup(section.questions);
    this.questionOrder = section.questionOrder;

    this.repeat = section.repeat;
    this.shouldAsk = section.shouldAsk ? new Statements(section.shouldAsk) : undefined;
    this.retainWhenNotAsked = section.retainWhenNotAsked;
  }

  public getForm(initialValue: any, fb: FormBuilder, customValidators?: Map<string, NormalizedValidator>): FormGroup | FormArray {
    if (this.repeat) {
      const arr = fb.array([]);
      if (initialValue && Array.isArray(initialValue)) {
        initialValue.forEach(value => arr.push(
          this.formGroup(value, fb, customValidators)
        ))
      }
      return arr;
    }
    return this.formGroup(initialValue, fb, customValidators);
  }

  public formGroup(initialValue: any, fb: FormBuilder, customValidators?: Map<string, NormalizedValidator>): FormGroup {
    const controls = Object.entries(this.questions)
      .reduce((prev, curr) => ({
        ...prev,
        [`${curr[0]}`]: curr[1].control(initialValue ? initialValue[curr[0]] ?? null : null, fb, customValidators)
      }), {});
    // Todo: Get Cross Field Validators on all Questions.
    return new FormGroup(controls);
  }

  public getShouldAsk(control: AbstractControl, customConditions?: Map<string, ConditionsFunction>): boolean {
    if(!this.shouldAsk) return true;
    return this.shouldAsk.checkStatements(control, customConditions);
  }

  public changeEvents(control: AbstractControl, customConditions?: Map<string, ConditionsFunction>): Observable<any> | undefined {
    if (!this.shouldAsk) return undefined;
    return DynamicFormsUtils.gatherChangeEvents(control, this.shouldAsk, this.retainWhenNotAsked, customConditions)
  }

  public getQuestionsChangeEvents(control: AbstractControl, customConditions?: Map<string, ConditionsFunction>): Observable<any> | undefined {
    const questions = Object.entries(this.questions);
    if (questions.every(([, question]: [string, Question]) => !question.shouldAsk)) return undefined;
    const changes = questions
      .map(([_, question]: [string, Question]) => question)
      .filter(_ => _.shouldAsk)
      .map((question: Question) => {
        const questionControl = control.get(question.id);
        if (!questionControl) return undefined;
        return question.changeEvents(questionControl as FormControl, customConditions)
      }).filter(_ => _ !== undefined);
    return changes.length > 0 ? combineLatest([...changes]) : undefined;
  }

}
