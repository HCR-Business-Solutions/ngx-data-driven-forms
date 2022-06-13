import { FormGroup, ValidatorFn } from '@angular/forms';
import { FieldValidatorFn, CrossFieldValidatorFn } from '../../types';
import { resovleCrossFieldValidators } from '../../utils';
import {
  ICrossFieldValidationPack,
  IPage,
  IRendererConfig,
  IShouldAsk,
} from '../interfaces';
import { Question } from './question';
import { Section } from './section';

export class Page implements IPage {
  id: string;
  title?: string | undefined;
  narrative?: string | undefined;
  sections: Section[];
  shouldAsk?: IShouldAsk | undefined;
  rendererConfig?: IRendererConfig | undefined;
  customProps?: { [key: string]: any } | undefined;

  constructor(page: IPage) {
    this.id = page.id;
    this.title = page.title;
    this.narrative = page.narrative;
    this.sections = page.sections.map((_) => new Section(_));
    this.shouldAsk = page.shouldAsk;
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
}
