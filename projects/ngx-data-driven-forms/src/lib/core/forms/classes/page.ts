import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  FieldValidatorFn,
  CrossFieldValidatorFn,
  ConditionFn,
} from '../../types';
import { resovleCrossFieldValidators } from '../../utils';
import {
  ICrossFieldValidationPack,
  IPage,
  IRendererConfig,
  IShouldAsk,
} from '../interfaces';
import { Question } from './question';
import { Section } from './section';
import { ShouldAsk } from './should-ask';

export class Page implements IPage {
  id: string;
  title?: string | undefined;
  narrative?: string | undefined;
  sections: Section[];
  shouldAsk?: ShouldAsk | undefined;
  rendererConfig?: IRendererConfig | undefined;
  customProps?: { [key: string]: any } | undefined;

  constructor(page: IPage) {
    this.id = page.id;
    this.title = page.title;
    this.narrative = page.narrative;
    this.sections = page.sections.map((_) => new Section(_));
    this.shouldAsk = page.shouldAsk ? new ShouldAsk(page.shouldAsk) : undefined;
    this.rendererConfig = page.rendererConfig;
    this.customProps = page.customProps;
  }

  public asForm(
    initialValue: any,
    fieldValidators: Map<string, FieldValidatorFn>,
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): FormGroup {
    const controls = this.sections.reduce(
      (prev, section) => ({
        ...prev,
        [`${section.id}`]: section.asForm(
          initialValue ? initialValue[section.id] ?? null : null,
          fieldValidators,
          crossFieldValidators
        ),
      }),
      {}
    );

    return new FormGroup(
      controls,
      this.getCrossFieldValidators(crossFieldValidators)
    );
  }

  public getCrossFieldValidators(
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): ValidatorFn[] {
    return resovleCrossFieldValidators(
      crossFieldValidators,
      this.sections.reduce(
        (prev: Question[], curr: Section) => [
          ...prev,
          ...Object.values(curr.questions),
        ],
        []
      ),
      2
    );
  }

  public getShouldAskWithSideEffects(
    control: AbstractControl,
    knownConditions: Map<string, ConditionFn>
  ): boolean {
    if (!this.shouldAsk) return true;
    return this.shouldAsk.shouldAskWithSideEffect(control, knownConditions);
  }

  public getChangeEvents(
    control: AbstractControl,
    knownConditions: Map<string, ConditionFn>
  ): Observable<boolean> | undefined {
    if (!this.shouldAsk) return undefined;
    return this.shouldAsk.gatherChangeEvents(control, knownConditions);
  }
}
