import {Statements} from './statements';
import {QuestionGroup} from './question-group';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {combineLatest, Observable} from 'rxjs';
import {Question} from './question';
import {ICrossFieldValidatorPackage, ISection} from '../interfaces';
import {ConditionsFunction, NormalizedCrossFieldValidator, NormalizedValidator} from '../../types';
import {gatherChangeEvents} from '../../utilities';

export class Section implements ISection {

  public id: string;
  public title?: string;
  public border?: boolean;

  public narrative?: {
    text: string;
    style?: 'markdown' | 'plaintext';
  };

  public questions: QuestionGroup;
  public questionOrder: string[];

  public repeat?: {
    style: 'list' | 'table';
    itemName: string;
    inputStyle?: string;
    minEntries?: number;
    maxEntries?: number;
    preserveList?: boolean;
    useToggleView?: boolean;
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

  public getForm(initialValue: any, fb: FormBuilder, knownValidators: Map<string, NormalizedValidator>, knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>): FormGroup | FormArray {
    if (this.repeat) {
      const arr = fb.array([]);
      if (initialValue && Array.isArray(initialValue)) {
        initialValue.forEach(value => arr.push(
          this.formGroup(value, fb, knownValidators, knownCrossFieldValidators)
        ));
      }
      return arr;
    }
    return this.formGroup(initialValue, fb, knownValidators, knownCrossFieldValidators);
  }

  public formGroup(initialValue: any, fb: FormBuilder, knownValidators: Map<string, NormalizedValidator>, knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>): FormGroup {
    const controls = Object.entries(this.questions)
      .reduce((prev, curr) => ({
        ...prev,
        [`${curr[0]}`]: curr[1].control(initialValue ? initialValue[curr[0]] ?? null : null, fb, knownValidators)
      }), {});

    const crossFieldValidators = this.getCrossFieldValidators(knownCrossFieldValidators);
    return new FormGroup(controls, crossFieldValidators);
  }

  public getShouldAsk(control: AbstractControl, knownConditions?: Map<string, ConditionsFunction>): boolean {
    if (!this.shouldAsk) return true;
    return this.shouldAsk.checkStatements(control, knownConditions);
  }

  public changeEvents(control: AbstractControl, knownConditions?: Map<string, ConditionsFunction>): Observable<any> | undefined {
    if (!this.shouldAsk) return undefined;
    return gatherChangeEvents(control, this.shouldAsk, this.retainWhenNotAsked, knownConditions);
  }

  public getQuestionsChangeEvents(control: AbstractControl, knownConditions?: Map<string, ConditionsFunction>): Observable<any> | undefined {
    const questions = Object.entries(this.questions);
    if (questions.every(([, question]: [string, Question]) => !question.shouldAsk)) return undefined;
    const changes = questions
      .map(([_, question]: [string, Question]) => question)
      .filter(_ => _.shouldAsk)
      .map((question: Question) => {
        const questionControl = control.get(question.id);
        if (!questionControl) return undefined;
        return question.changeEvents(questionControl as FormControl, knownConditions);
      }).filter(_ => _ !== undefined);
    return changes.length > 0 ? combineLatest([...changes]) : undefined;
  }

  public getCrossFieldValidators(knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>): ValidatorFn[] {

    const validators: ValidatorFn[] = [];

    const relaventValidators = Object.values(this.questions)
      .filter(_ => _.crossFieldValidation && _.crossFieldValidation.length > 0)
      .filter(_ => _.crossFieldValidation?.filter(pack => pack.expectedParentLevel === 1).length ?? 0 > 0)
      .map(_ => ({
        id: _.id,
        crossFieldValidation: _.crossFieldValidation?.filter(pack => pack.expectedParentLevel)
      }));

    relaventValidators.forEach((questionValidaton: { id: string, crossFieldValidation?: ICrossFieldValidatorPackage[] }) => {
      if (!questionValidaton.crossFieldValidation || questionValidaton.crossFieldValidation.length < 0) return;
      questionValidaton.crossFieldValidation.forEach(validatorPack => {
        const siblingId = validatorPack.sibling;
        Object.entries<any>({
          ...validatorPack.crossFieldValidation ?? {},
          ...validatorPack.customCrossFieldValidation ?? {},
        }).forEach(([key, arg]: [string, any]) => {
          const func = knownCrossFieldValidators.get(key);
          if (!func) return;
          const funcEval = func(questionValidaton.id, siblingId, arg);
          if (funcEval) validators.push(funcEval);
        });
      });
    });

    return validators;

  }

}
