import {Page} from './page';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {IApplication} from '../interfaces';
import {NormalizedCrossFieldValidator, NormalizedValidator} from '../../types';

export class Application implements IApplication {

  public id: string;
  public description: string;
  public pages: Page[];

  constructor(application: IApplication) {

    this.id = application.id;
    this.description = application.description;
    this.pages = application.pages.map(_ => new Page(_));

  }

  public getForm(initialValue: any, fb: FormBuilder, knownValidators: Map<string, NormalizedValidator>, knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>): FormGroup {
    const controls: {[key: string]: FormGroup | FormArray} = this.pages.reduce(
      (prev, curr) => ({
        ...prev,
        [`${curr.id}`]: curr.getForm(initialValue ? initialValue[curr.id] ?? null : null, fb, knownValidators, knownCrossFieldValidators)
      }), {});

    return new FormGroup(controls);
  }


}
