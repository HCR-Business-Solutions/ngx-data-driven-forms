export interface IConditions {
  hasValue?: boolean;
  valueMatches?: any;
  pattern?: string;
  isLessThan?: number;
  isGreaterThan?: number;
  isEqualTo?: number;
  isLessOrEqual?: number;
  isGreaterOrEqual: number;
  isTruthy?: boolean;
  isFalsy?: boolean;
  isDate?: boolean;
  isDateBefore?: Date | string;
  isDateAfter?: Date | string;
  isDateOn?: Date | string;
  isDateOnOrBefore?: Date | string;
  isDateOnOrAfter?: Date | string;
  isAgeGreaterThan?: number;
  isAgeLessThan?: number;
  isAgeEqualTo?: number;
  isAgeGreaterOrEqual?: number;
  isAgeLessOrEqual?: number;
}
