import {AbstractControl, ValidatorFn, Validators} from '@angular/forms';
import {SupportedLogicUtils} from '../utils/supported-logic';
import {DateUtils} from '../utils/date';

export class SupportedValidators {

  public static min(min: number): ValidatorFn | undefined {
    return Validators.min(min);
  }

  public static max(max: number): ValidatorFn | undefined {
    return Validators.max(max);
  }

  public static required(isRequired?: boolean): ValidatorFn | undefined {
    if (!isRequired) return undefined;
    return Validators.required;
  }

  public static requiredTrue(isRequiredTrue?: boolean): ValidatorFn | undefined {
    if (!isRequiredTrue) return undefined;
    return Validators.requiredTrue;
  }

  public static minLength(minLength: number): ValidatorFn | undefined {
    return Validators.minLength(minLength);
  }

  public static maxLength(maxLength: number): ValidatorFn | undefined {
    return Validators.maxLength(maxLength);
  }

  public static pattern(pattern: string): ValidatorFn | undefined {
    return Validators.pattern(pattern);
  }

  public static isGreaterThan(comparison: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      return SupportedLogicUtils.isGreaterThan(c.value, comparison) ?
        null :
        ({isGreaterThan: {actual: c.value, expected: comparison}});
    };
  }

  public static isLessThan(comparison: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      return SupportedLogicUtils.isLessThen(c.value, comparison) ?
        null :
        ({isLessThan: {actual: c.value, expected: comparison}});
    };
  }

  public static isEqualTo(comparison: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      return SupportedLogicUtils.isEqualTo(c.value, comparison) ?
        null :
        ({isEqualTo: {actual: c.value, expected: comparison}});
    };
  }

  public static isLessOrEqual(comparison: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      return SupportedLogicUtils.isLessOrEqual(c.value, comparison) ?
        null :
        ({isLessOrEqual: {actual: c.value, expected: comparison}});
    };
  }

  public static isGreaterOrEqual(comparison: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      return SupportedLogicUtils.isGreaterOrEqual(c.value, comparison) ?
        null :
        ({isGreaterOrEqual: {actual: c.value, expected: comparison}});
    };
  }

  public static isTruthy(check?: boolean): ValidatorFn | undefined {
    if (!check) return undefined;
    return (c: AbstractControl) => {
      return SupportedLogicUtils.isTruthy(c.value, true) ? null : {isTruthy: true};
    };

  }

  public static isFalsy(check?: boolean): ValidatorFn | undefined {
    if (!check) return undefined;
    return (c: AbstractControl) => {
      return SupportedLogicUtils.isFalsy(c.value, true) ? null : {isFalsy: true};
    };
  }

  public static isDate(check?: boolean): ValidatorFn | undefined {
    if (!check) return undefined;
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      return SupportedLogicUtils.isDate(c.value, true) ? null : {isDate: true};
    };
  }

  public static isDateBefore(date: Date | string): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isDateBefore(c.value, date) ? null : {isDateBefore: {expected: date, actual: c.value}};
    };
  }

  public static isDateAfter(date: Date | string): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isDateAfter(c.value, date) ? null : {isDateAfter: {expected: date, actual: c.value}};
    };
  }

  public static isDateOn(date: Date | string): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isDateOn(c.value, date) ? null : {isDateOn: {expected: date, actual: c.value}};
    };
  }

  public static isDateOnOrBefore(date: Date | string): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isDateOnOrBefore(c.value, date) ? null : {
        isDateOnOrBefore: {
          expected: date,
          actual: c.value
        }
      };
    };
  }

  public static isDateOnOrAfter(date: Date | string): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isDateOnOrAfter(c.value, date) ? null : {
        isDateOnOrAfter: {
          expected: date,
          actual: c.value
        }
      };
    };
  }

  public static isAgeGreaterThan(age: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isAgeGreaterThan(c.value, age) ? null : {
        isAgeGreaterThan: {
          expected: age,
          actual: DateUtils.calculateAge(new Date(c.value))
        }
      };
    };
  }

  public static isAgeLessThan(age: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isAgeLessThan(c.value, age) ? null : {
        isAgeLessThan: {
          expected: age,
          actual: DateUtils.calculateAge(new Date(c.value))
        }
      };
    };
  }

  public static isAgeEqualTo(age: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isAgeEqualTo(c.value, age) ? null : {
        isAgeEqualTo: {
          expected: age,
          actual: DateUtils.calculateAge(new Date(c.value))
        }
      };
    };
  }

  public static isAgeGreaterOrEqual(age: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isAgeGreaterOrEqual(c.value, age) ? null : {
        isAgeGreaterOrEqual: {
          expected: age,
          actual: DateUtils.calculateAge(new Date(c.value))
        }
      };
    };
  }

  public static isAgeLessOrEqual(age: number): ValidatorFn | undefined {
    return (c: AbstractControl) => {
      if (c.value === null || c.value === undefined) return null;
      if (!SupportedLogicUtils.isDate(c.value, true)) return null;
      return SupportedLogicUtils.isAgeLessOrEqual(c.value, age) ? null : {
        isAgeLessOrEqual: {
          expected: age,
          actual: DateUtils.calculateAge(new Date(c.value))
        }
      };
    };
  }

}

