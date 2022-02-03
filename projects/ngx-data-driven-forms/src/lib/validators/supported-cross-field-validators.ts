import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ObjectUtils} from '../utils/object';
import {SupportedLogicUtils} from '../utils';
import {NormalizedCrossFieldValidator} from '../types';
import {DATE_VALIDATORS} from './supported-validators';

export class SupportedCrossFieldValidators {


  private static getPairValues(target: AbstractControl | null, sibling: AbstractControl | null): [any | undefined, any | undefined] {
    return [target?.value ?? undefined, sibling?.value ?? undefined];
  }


  public static requireIf(targetId: string, siblingId: string, arg: boolean): ValidatorFn | undefined {
    if (!arg) return undefined;

    return (control: AbstractControl) => {

      const [target, sibling] = [control.get(targetId), control.get(siblingId)];
      if (!target || !sibling) return null;
      const [targetVal, siblingVal] = SupportedCrossFieldValidators.getPairValues(target, sibling);
      if ((siblingVal === null || siblingVal === undefined)) return null;

      const errors = ObjectUtils.isNullOrUndefined(targetVal) ? {required: siblingId} : null;

      target.setErrors(errors);
      return errors;

    }
  }

  public static requireIfMatch(targetId: string, siblingId: string, arg: any): ValidatorFn | undefined {
    if (!arg) return undefined;

    return (control: AbstractControl) => {

      const [target, sibling] = [control.get(targetId), control.get(siblingId)];
      if (!target || !sibling) return null;
      const [targetVal, siblingVal] = SupportedCrossFieldValidators.getPairValues(target, sibling);
      if ((siblingVal === null || siblingVal === undefined) || (siblingVal !== arg)) return null;

      const errors = ObjectUtils.isNullOrUndefined(targetVal) ? {required: siblingId} : null;

      control.get(targetId)?.setErrors(errors);
      return errors;

    }

  }

  public static isLessThanSibling(targetId: string, siblingId: string, arg: number): ValidatorFn | undefined {
    if (!arg) return undefined;

    return (control: AbstractControl) => {

      const [target, sibling] = [control.get(targetId), control.get(siblingId)];
      if (!target || !sibling) return null;
      const [targetVal, siblingVal] = SupportedCrossFieldValidators.getPairValues(target, sibling);
      if (ObjectUtils.isNullOrUndefined(targetVal) || ObjectUtils.isNullOrUndefined(siblingVal)) return null;

      const errors = targetVal < siblingVal ? null : {isLessThan: {sibling: siblingId, expected: siblingVal, actual: targetVal}};
      target.setErrors(errors);

      return errors;

    }
  }

  public static isGreaterThanSibling(targetId: string, siblingId: string, arg: number): ValidatorFn | undefined {
    if (!arg) return undefined;

    return (control: AbstractControl) => {

      const [target, sibling] = [control.get(targetId), control.get(siblingId)];
      if (!target || !sibling) return null;
      const [targetVal, siblingVal] = SupportedCrossFieldValidators.getPairValues(target, sibling);
      if (ObjectUtils.isNullOrUndefined(targetVal) || ObjectUtils.isNullOrUndefined(siblingVal)) return null;

      const errors = targetVal > siblingVal ? null : {isGreaterThan: {sibling: siblingId, expected: siblingVal, actual: targetVal}};
      target.setErrors(errors);

      return errors;

    }
  }


  public static isEqualToSibling(targetId: string, siblingId: string, arg: number): ValidatorFn | undefined {
    if (!arg) return undefined;

    return (control: AbstractControl) => {

      const [target, sibling] = [control.get(targetId), control.get(siblingId)];
      if (!target || !sibling) return null;
      const [targetVal, siblingVal] = SupportedCrossFieldValidators.getPairValues(target, sibling);
      if (ObjectUtils.isNullOrUndefined(targetVal) || ObjectUtils.isNullOrUndefined(siblingVal)) return null;

      const errors = targetVal === siblingVal ? null : {isEqualTo: {sibling: siblingId, expected: siblingVal, actual: targetVal}};
      target.setErrors(errors);

      return errors;

    }
  }

  public static isLessOrEqualSibling(targetId: string, siblingId: string, arg: number): ValidatorFn | undefined {
    if (!arg) return undefined;

    return (control: AbstractControl) => {

      const [target, sibling] = [control.get(targetId), control.get(siblingId)];
      if (!target || !sibling) return null;
      const [targetVal, siblingVal] = SupportedCrossFieldValidators.getPairValues(target, sibling);
      if (ObjectUtils.isNullOrUndefined(targetVal) || ObjectUtils.isNullOrUndefined(siblingVal)) return null;

      const errors = targetVal <= siblingVal ? null : {isLessOrEqual: {sibling: siblingId, expected: siblingVal, actual: targetVal}};
      target.setErrors(errors);

      return errors;

    }
  }

  public static isGreaterOrEqualSibling(targetId: string, siblingId: string, arg: number): ValidatorFn | undefined {
    if (!arg) return undefined;

    return (control: AbstractControl) => {

      const [target, sibling] = [control.get(targetId), control.get(siblingId)];
      if (!target || !sibling) return null;
      const [targetVal, siblingVal] = SupportedCrossFieldValidators.getPairValues(target, sibling);
      if (ObjectUtils.isNullOrUndefined(targetVal) || ObjectUtils.isNullOrUndefined(siblingVal)) return null;

      const errors = targetVal >= siblingVal ? null : {isGreaterOrEqual: {sibling: siblingId, expected: siblingVal, actual: targetVal}};
      target.setErrors(errors);

      return errors;

    }
  }


  /**
   * A generic function that packages together the date sibling validators into a single function.
   * Takes in a string type and returns a normalized cross field validator.
   * @param type
   * @return NormalizedCrossFieldValidator
   */
  public static dateSiblingValidator(type: 'before' | 'after' | 'on' | 'onOrBefore' | 'onOrAfter'): NormalizedCrossFieldValidator {

    // Get the SupportedLogic Comparison Function from the type
    const comparisonFunction =  DATE_VALIDATORS[type];
    // Get the appropriate error key
    const errorKey = `isDate${type.toLocaleUpperCase()}`;

    return (targetId, siblingId, arg) => !arg ? undefined : (control) => {

      // Get Target and Sibling Controls
      const [target, sibling] = [control.get(targetId), control.get(siblingId)];
      // Return null if either control is not found
      if (!target || !sibling) return null;

      // Get Values Of Target and Sibling
      const [targetVal, siblingVal] = SupportedCrossFieldValidators.getPairValues(target, sibling);
      // Return null if either value is null or undefined
      if (ObjectUtils.isNullOrUndefined(targetVal) || ObjectUtils.isNullOrUndefined(siblingVal)) return null;
      // Return null if either value is not a date
      if (!SupportedLogicUtils.isDate(targetVal, true) || !SupportedLogicUtils.isDate(siblingVal, true)) return  null;

      // Ensure we have the target and sibling as dates
      const [targetDate, siblingDate] = [new Date(targetVal), new Date(siblingVal)];

      // Run the comparison function and give us back an error object if it fails.
      const errors = comparisonFunction(targetDate, siblingDate) ? null : {[`${errorKey}`]: {sibling: siblingId, expected: siblingDate, actual: targetDate}};

      // Set the target errors to the result of the comparison function
      target.setErrors(errors);

      // Return the current errors
      return errors;
    }
  }

}
