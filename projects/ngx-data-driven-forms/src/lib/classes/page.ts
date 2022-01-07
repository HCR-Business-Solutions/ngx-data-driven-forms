import {Statements} from './statements';
import {Section} from './section';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {IPage} from '../interfaces';
import {ConditionsFunction, NormalizedValidator} from '../types';
import {DynamicFormsUtils} from '../utils';

export class Page implements IPage {
  public id: string;
  public pageTitle?: string;

  public sections: Section[];

  public shouldAsk?: Statements;
  public retainWhenNotAsked?: boolean;

  constructor(page: IPage) {
    this.id = page.id;
    this.pageTitle = page.pageTitle;

    this.sections = page.sections.map(_ => new Section(_));

    this.shouldAsk = page.shouldAsk ? new Statements(page.shouldAsk) : undefined;
    this.retainWhenNotAsked = page.retainWhenNotAsked
  }

  public getForm(initialValue: any, fb: FormBuilder, customValidators?: Map<string, NormalizedValidator>): FormGroup {

    const controls: {[key: string]: FormGroup | FormArray} = this.sections.reduce(
      (prev, curr) => ({
        ...prev,
        [`${curr.id}`]: curr.getForm(initialValue ? initialValue[curr.id] ?? null : null, fb, customValidators)
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
