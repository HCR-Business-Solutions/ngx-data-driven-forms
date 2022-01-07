export interface IQuestionValidation {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  isGreaterThan?: number;
  isLessThan?: number;
  isEqualTo?: number;
  isLessOrEqual?: number;
  isGreaterOrEqual?: number;
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
