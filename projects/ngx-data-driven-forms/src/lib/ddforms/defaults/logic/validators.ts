import { AbstractControl, Validators } from '@angular/forms';
import {
  AGE_COMPARISONS,
  calculateAge,
  DATE_COMPARISONS,
  isDate as dateCheck,
  isNullOrUndefined,
  NUMBER_COMPARISONS,
  isTruthy as truthyCheck,
  isFalsy as falsyCheck,
} from '../../../shared/utilities';
import {
  NormalizedValidator,
  NumberComparison,
  DateComparison,
  AgeComparison,
} from '../../../shared/types';

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

export const isTruthy: NormalizedValidator = (check?: boolean) =>
  !check
    ? undefined
    : (c: AbstractControl) =>
        truthyCheck(c.value, true) ? null : { isTruthy: true };

export const isFalsy: NormalizedValidator = (check?: boolean) =>
  !check
    ? undefined
    : (c: AbstractControl) =>
        falsyCheck(c.value, true) ? null : { isFalsy: true };

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
            : { [`${compareType}`]: { expected: comparison, actual: c.value } };
};

export const isDate: NormalizedValidator = (check?: boolean) =>
  !check
    ? undefined
    : (c: AbstractControl) =>
        isNullOrUndefined(c.value)
          ? null
          : dateCheck(c.value, true)
          ? null
          : { isDate: true };

export const dateComparison: (
  compareType: DateComparison
) => NormalizedValidator = (compareType: DateComparison) => {
  const comparisonFunction = DATE_COMPARISONS[compareType];
  return (comparison: Date | string) =>
    !comparisonFunction
      ? undefined
      : (c: AbstractControl) =>
          isNullOrUndefined(c.value) || !dateCheck(c.value, true)
            ? null
            : comparisonFunction(new Date(c.value), new Date(comparison))
            ? null
            : {
                [`${compareType}`]: {
                  expected: new Date(comparison),
                  actual: new Date(c.value),
                },
              };
};

export const ageComparison: (
  compareType: AgeComparison
) => NormalizedValidator = (compareType: AgeComparison) => {
  const comparisonFunction = AGE_COMPARISONS[compareType];
  return (age: number) =>
    !comparisonFunction
      ? undefined
      : (c: AbstractControl) =>
          isNullOrUndefined(c.value) || !dateCheck(c.value, true)
            ? null
            : comparisonFunction(c.value, age)
            ? null
            : {
                [`${compareType}`]: {
                  expected: age,
                  actual: calculateAge(new Date(c.value)),
                },
              };
};
