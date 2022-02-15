import {AbstractControl, ValidatorFn} from '@angular/forms';
import {DateComparison, NormalizedCrossFieldValidator, NumberComparison,} from '../../../shared/types';
import {DATE_COMPARISONS, isDate, isNullOrUndefined, NUMBER_COMPARISONS,} from '../../../shared/utilities';

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

    const errors = isNullOrUndefined(targetVal) || targetVal === '' || targetVal === {}
      ? {required: siblingId}
      : null;

    const totalErrors = errors || target.errors ? {
      ...(errors ?? {}),
      ...(target.errors ?? {}),
    } : null;

    target.setErrors(totalErrors);
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
      ? {required: siblingId}
      : null;

    const totalErrors = errors || target.errors ? {
      ...(errors ?? {}),
      ...(target.errors ?? {}),
    } : null;

    target.setErrors(totalErrors);

    return errors;
  };
}

export function numberSiblingValidator(
  type: NumberComparison
): NormalizedCrossFieldValidator {

  // Resolve the number comparison function.
  const comparisonFunction = NUMBER_COMPARISONS[type];

  return (targetId, siblingId, arg) =>
    // If there is no passed argument or the comparison function could not be found return undefined, else return the comparisonFunction
    !isNullOrUndefined(arg) || !comparisonFunction
      ? undefined
      : (control) => {

        // Get the target and sibling controls from the containing form group.
        const [target, sibling] = [
          control.get(targetId),
          control.get(siblingId),
        ];

        // If the target or sibling could not be found, return null (no error)
        if (!target || !sibling) return null;

        // Get the values of target and sibling.
        const [targetVal, siblingVal] = getPairValues(target, sibling);

        // If either the target value or sibling value is null or undefined return null (no error)
        if (isNullOrUndefined(targetVal) || isNullOrUndefined(siblingVal))
          return null;

        // Run the resolved comparison function, if it passes return null (no error) else return a constructed error object.
        const errors = comparisonFunction(targetVal, siblingVal)
          ? null
          : {
            [`${type}`]: {
              sibling: siblingId,
              expected: siblingVal,
              actual: targetVal,
            },
          };

        // Combine the target errors with the possible errors of this validator function (ensures we do not lose any validators that are present on the control)
        const totalErrors = errors || target.errors ? {
          ...(errors ?? {}),
          ...(target.errors ?? {}),
        } : null;

        // Set the target's errors to the combined error object.
        target.setErrors(totalErrors);

        // Return this validator's errors.
        return errors;
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

        // Get the errors from the target and combine them with possible errors from the validator (ensures that we do not lose any errors present on the component)
        const totalErrors = errors || target.errors ? {
          ...(errors ?? {}),
          ...(target.errors ?? {}),
        } : null;

        // Set the errors of the target to the combination of the target errors and total errors.
        target.setErrors(totalErrors);

        // Return this validator's errors
        return errors;
      };
}
