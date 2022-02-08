import { AbstractControl, ValidatorFn } from '@angular/forms';
import {
  DateComparison,
  NormalizedCrossFieldValidator,
  NumberComparison,
} from '../../../shared/types';
import {
  DATE_COMPARISONS,
  isDate,
  isNullOrUndefined,
  NUMBER_COMPARISONS,
} from '../../../shared/utilities';

function getPairValues(
  target: AbstractControl | null,
  sibling: AbstractControl | null
): [any | undefined, any | undefined] {
  return [target?.value ?? undefined, sibling?.value ?? undefined];
}

export function requireIf(
  targetId: string,
  siblingId: string,
  arg: boolean
): ValidatorFn | undefined {
  if (!arg) return undefined;

  return (control: AbstractControl) => {
    const [target, sibling] = [control.get(targetId), control.get(siblingId)];
    if (!target || !sibling) return null;
    const [targetVal, siblingVal] = getPairValues(target, sibling);
    if (siblingVal === null || siblingVal === undefined) return null;

    const errors = isNullOrUndefined(targetVal)
      ? { required: siblingId }
      : null;

    target.setErrors(errors);
    return errors;
  };
}

export function requireIfMatch(
  targetId: string,
  siblingId: string,
  arg: any
): ValidatorFn | undefined {
  if (!arg) return undefined;

  return (control: AbstractControl) => {
    const [target, sibling] = [control.get(targetId), control.get(siblingId)];
    if (!target || !sibling) return null;
    const [targetVal, siblingVal] = getPairValues(target, sibling);
    if (siblingVal === null || siblingVal === undefined || siblingVal !== arg)
      return null;

    const errors = isNullOrUndefined(targetVal)
      ? { required: siblingId }
      : null;

    control.get(targetId)?.setErrors(errors);
    return errors;
  };
}

export function numberSiblingValidator(
  type: NumberComparison
): NormalizedCrossFieldValidator {
  const comparisonFunction = NUMBER_COMPARISONS[type];

  return (targetId, siblingId, arg) =>
    !arg || !comparisonFunction
      ? undefined
      : (control) => {
          const [target, sibling] = [
            control.get(targetId),
            control.get(siblingId),
          ];
          if (!target || !sibling) return null;
          const [targetVal, siblingVal] = getPairValues(target, sibling);
          if (isNullOrUndefined(targetVal) || isNullOrUndefined(siblingVal))
            return null;
          return comparisonFunction(targetVal, siblingVal)
            ? null
            : {
                [`${type}`]: {
                  sibling: siblingId,
                  expected: siblingVal,
                  actual: targetVal,
                },
              };
        };
}

/**
 * A generic function that packages together the date sibling validators into a single function.
 * Takes in a string type and returns a normalized cross field validator.
 * @param type
 * @return NormalizedCrossFieldValidator
 */
export function dateSiblingValidator(
  type: DateComparison
): NormalizedCrossFieldValidator {
  // Get the SupportedLogic Comparison Function from the type
  const comparisonFunction = DATE_COMPARISONS[type];

  return (targetId, siblingId, arg) =>
    !arg || !comparisonFunction
      ? undefined
      : (control) => {
          // Get Target and Sibling Controls
          const [target, sibling] = [
            control.get(targetId),
            control.get(siblingId),
          ];
          // Return null if either control is not found
          if (!target || !sibling) return null;

          // Get Values Of Target and Sibling
          const [targetVal, siblingVal] = getPairValues(target, sibling);
          // Return null if either value is null or undefined
          if (isNullOrUndefined(targetVal) || isNullOrUndefined(siblingVal))
            return null;
          // Return null if either value is not a date
          if (!isDate(targetVal, true) || !isDate(siblingVal, true))
            return null;

          // Ensure we have the target and sibling as dates
          const [targetDate, siblingDate] = [
            new Date(targetVal),
            new Date(siblingVal),
          ];

          // Run the comparison function and give us back an error object if it fails.
          const errors = comparisonFunction(targetDate, siblingDate)
            ? null
            : {
                [`${type}`]: {
                  sibling: siblingId,
                  expected: siblingDate,
                  actual: targetDate,
                },
              };

          // Set the target errors to the result of the comparison function
          target.setErrors(errors);

          // Return the current errors
          return errors;
        };
}
