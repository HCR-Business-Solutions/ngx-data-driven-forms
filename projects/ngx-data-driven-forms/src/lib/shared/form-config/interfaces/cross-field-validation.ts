export interface ICrossFieldValidation {

  requireIf?: boolean;
  requireIfMatch?: any;
  isLessThan?: boolean;
  isGreaterThan?: boolean;
  isEqualTo?: boolean;
  isLessOrEqual?: boolean;
  isGreaterOrEqual?: boolean;
  isDateBefore?: boolean;
  isDateAfter?: boolean;
  isDateOn?: boolean;
  isDateOnOrBefore?: boolean;
  isDateOnOrAfter?: boolean;
}
