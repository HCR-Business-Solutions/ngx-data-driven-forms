export interface ICrossFieldValidation {

  requireIf?: boolean;
  requireIfMatch?: any;
  isLessThan?: number;
  isGreaterThan?: number;
  isEqualTo?: number;
  isLessOrEqual?: number;
  isGreaterOrEqual?: number;
  isDateBefore?: boolean;
  isDateAfter?: boolean;
  isDateOn?: boolean;
  isDateOnOrBefore?: boolean;
  isDateOnOrAfter?: boolean;
}
