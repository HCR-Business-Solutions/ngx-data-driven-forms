import {Statements} from './statements';
import {Section} from './section';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {IPage} from '../interfaces';
import {ConditionsFunction, NormalizedCrossFieldValidator, NormalizedValidator} from '../../types';
import {DynamicFormsUtils} from '../../utils';

export class Page implements IPage {
  public id: string;
  public title?: string;

  public narrative?: string;

  public sections: Section[];

  public shouldAsk?: Statements;
  public retainWhenNotAsked?: boolean;

  constructor(page: IPage) {
    this.id = page.id;
    this.title = page.title;

    this.narrative = page.narrative;

    this.sections = page.sections.map(_ => new Section(_));

    this.shouldAsk = page.shouldAsk ? new Statements(page.shouldAsk) : undefined;
    this.retainWhenNotAsked = page.retainWhenNotAsked;
  }

  public getForm(initialValue: any, fb: FormBuilder, knownValidators: Map<string, NormalizedValidator>, knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>): FormGroup {

    const controls: {[key: string]: FormGroup | FormArray} = this.sections.reduce(
      (prev, curr) => ({
        ...prev,
        [`${curr.id}`]: curr.getForm(initialValue ? initialValue[curr.id] ?? null : null, fb, knownValidators, knownCrossFieldValidators)
      }), {});

    return new FormGroup(controls);
  }

  public getShouldAsk(control: AbstractControl, customConditions?: Map<string, ConditionsFunction>): boolean {
    if(!this.shouldAsk) return true;
    return this.shouldAsk.checkStatements(control, customConditions);
  }

  public changeEvents(control: AbstractControl, customConditions?: Map<string, ConditionsFunction>): Observable<any> | undefined {
    if (!this.shouldAsk) return undefined;
    return DynamicFormsUtils.gatherChangeEvents(control, this.shouldAsk, this.retainWhenNotAsked, customConditions);
  }

}
