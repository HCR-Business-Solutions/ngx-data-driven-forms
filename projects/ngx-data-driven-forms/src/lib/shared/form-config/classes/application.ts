import { Page } from './page';
import { FormArray, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { IApplication, ICrossFieldValidatorPackage } from '../interfaces';
import {
  NormalizedCrossFieldValidator,
  NormalizedValidator,
} from '../../types';

export class Application implements IApplication {
  public id: string;
  public description: string;
  public pages: Page[];

  constructor(application: IApplication) {
    this.id = application.id;
    this.description = application.description;
    this.pages = application.pages.map((_) => new Page(_));
  }

  public getForm(
    initialValue: any,
    fb: FormBuilder,
    knownValidators: Map<string, NormalizedValidator>,
    knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>
  ): FormGroup {
    const controls: { [key: string]: FormGroup | FormArray } =
      this.pages.reduce(
        (prev, curr) => ({
          ...prev,
          [`${curr.id}`]: curr.getForm(
            initialValue ? initialValue[curr.id] ?? null : null,
            fb,
            knownValidators,
            knownCrossFieldValidators
          ),
        }),
        {}
      );

    return new FormGroup(controls, this.getCrossFieldValidators(knownCrossFieldValidators));
  }

  public getCrossFieldValidators(
    knownCrossFieldValidators: Map<string, NormalizedCrossFieldValidator>
  ): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    this.pages.forEach((page) => {
      page.sections.forEach((section) => {
        const relaventValidators = Object.values(section.questions)
          .filter(
            (_) => _.crossFieldValidation && _.crossFieldValidation.length > 0
          )
          .filter(
            (_) =>
              _.crossFieldValidation?.filter(
                (pack) => pack.expectedParentLevel === 3
              ).length ?? 0 > 0
          )
          .map((_) => ({
            id: _.id,
            crossFieldValidation: _.crossFieldValidation?.filter(
              (pack) => pack.expectedParentLevel
            ),
          }));

        relaventValidators.forEach(
          (questionValidaton: {
            id: string;
            crossFieldValidation?: ICrossFieldValidatorPackage[];
          }) => {
            if (
              !questionValidaton.crossFieldValidation ||
              questionValidaton.crossFieldValidation.length < 0
            )
              return;
            questionValidaton.crossFieldValidation.forEach((validatorPack) => {
              const siblingId = validatorPack.sibling;
              Object.entries<any>({
                ...(validatorPack.crossFieldValidation ?? {}),
                ...(validatorPack.customCrossFieldValidation ?? {}),
              }).forEach(([key, arg]: [string, any]) => {
                const func = knownCrossFieldValidators.get(key);
                if (!func) return;
                const funcEval = func(`${page.id}.${section.id}.${questionValidaton.id}`, siblingId, arg);
                if (funcEval) validators.push(funcEval);
              });
            });
          }
        );
      });
    });

    return validators;
  }
}
