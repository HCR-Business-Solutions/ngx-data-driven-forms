import { ValidatorFn } from '@angular/forms';
import { Question } from '../forms/classes/question';
import { CrossFieldValidatorFn } from '../types';

export function resovleCrossFieldValidators(
  crossFieldValidators: Map<string, CrossFieldValidatorFn>,
  questions: Question[],
  expectedParentLevel: number
): ValidatorFn[] {
  // instantiate return array
  const resultValidators: ValidatorFn[] = [];

  const relaventValidators = questions
    // filter out any question that does not have any crossFieldValidation
    .filter((_) => _.crossFieldValidation && _.crossFieldValidation.length > 0)
    // filter out any validators that are not at exected parent level
    .filter(
      (_) =>
        _.crossFieldValidation?.filter(
          (pack) => pack.expectedParentLevel === expectedParentLevel
        ).length ?? 0 > 0
    )
    // reform id and crossfield validation into easier format, double check that all crossfield validators are targeting the right parent level
    .map((_) => ({
      id: _.id,
      validators: _.crossFieldValidation?.filter(
        (pack) => pack.expectedParentLevel === expectedParentLevel
      ),
    }));

  // go through each validator, check that it exists and if it does try to get the appropriate validator function
  relaventValidators.forEach(({ id, validators }) => {
    if (!validators || validators.length <= 0) return;
    validators.forEach((validatorPack) => {
      Object.entries(validatorPack.validation).forEach(([key, arg]) => {
        const func = crossFieldValidators.get(key);
        if (!func) return;
        const funcEval = func(id, validatorPack.sibling, arg);
        if (funcEval) resultValidators.push(funcEval);
      });
    });
  });

  return resultValidators;
}
