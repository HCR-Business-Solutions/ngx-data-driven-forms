import { AbstractControl, Validators } from '@angular/forms';
import { isNullOrUndefined, NUMBER_COMPARISONS } from '../../shared/utilities';
import { NormalizedValidator, NumberComparison } from '../../shared/types';

export const min: NormalizedValidator = (min: number) => Validators.min(min);

export const max: NormalizedValidator = (max: number) => Validators.max(max);

export const required: NormalizedValidator = (isRequired?: boolean) =>
  !isRequired ? undefined : Validators.required;

export const requiredTrue: NormalizedValidator = (isRequiredTrue?: boolean) =>
  !isRequiredTrue ? undefined : Validators.requiredTrue;

export const minLength: NormalizedValidator = (minLength: number) =>
  Validators.minLength(minLength);

export const maxLength: NormalizedValidator = (maxLength: number) =>
  Validators.maxLength(maxLength);

export const pattern: NormalizedValidator = (pattern: string) =>
  Validators.pattern(pattern);

export const numberComparison: (
  compareType: NumberComparison
) => NormalizedValidator = (compareType: NumberComparison) => {
  const comparisonFunction = NUMBER_COMPARISONS[compareType];
  return (comparison: number) =>
    !comparisonFunction
      ? undefined
      : (c: AbstractControl) =>
          isNullOrUndefined(c.value)
            ? null
            : comparisonFunction(c.value, comparison)
            ? null
            : ({[`${compareType}`]: {expected: comparison, actual: c.value}});
};
