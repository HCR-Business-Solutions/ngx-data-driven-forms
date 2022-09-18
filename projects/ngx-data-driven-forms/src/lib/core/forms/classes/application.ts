import { UntypedFormGroup, ValidatorFn } from '@angular/forms';
import { FieldValidatorFn, CrossFieldValidatorFn } from '../../types';
import { resovleCrossFieldValidators } from '../../utils';
import { IApplication, IRendererConfig } from '../interfaces';
import { Page } from './page';
import { Question } from './question';
import { Section } from './section';

export class Application implements IApplication {
  id: string;
  description: string;
  pages: Page[];
  rendererConfig?: IRendererConfig | undefined;
  customProps?: { [key: string]: any } | undefined;

  constructor(application: IApplication) {
    this.id = application.id;
    this.description = application.description;
    this.pages = application.pages.map((_) => new Page(_));
    this.rendererConfig = application.rendererConfig;
    this.customProps = application.customProps;
  }

  public asForm(
    initialValue: any,
    fieldValidators: Map<string, FieldValidatorFn>,
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): UntypedFormGroup {
    const controls = this.pages.reduce(
      (prev, page) => ({
        ...prev,
        [`${page.id}`]: page.asForm(
          initialValue ? initialValue[page.id] ?? null : null,
          fieldValidators,
          crossFieldValidators
        ),
      }),
      {}
    );

    return new UntypedFormGroup(
      controls,
      this.getCrossFieldValidators(crossFieldValidators)
    );
  }

  public getCrossFieldValidators(
    crossFieldValidators: Map<string, CrossFieldValidatorFn>
  ): ValidatorFn[] {
    return resovleCrossFieldValidators(
      crossFieldValidators,
      this.pages.reduce(
        (prev: Question[], curr: Page) => [
          ...prev,
          ...curr.sections.reduce(
            (prevsec: Question[], currsec: Section) => [
              ...prevsec,
              ...Object.values(currsec.questions),
            ],
            []
          ),
        ],
        []
      ),
      3
    );
  }
}
