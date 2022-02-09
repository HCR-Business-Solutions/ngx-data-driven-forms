import { NormalizedCrossFieldValidator } from '../../../shared/types';
import * as SupportedCrossFieldValidators from '../logic/cross-field-validators';

export const DEFAULT_CROSS_FIELD_VALIDATOR_MAP = new Map<string, NormalizedCrossFieldValidator>([
  ['requireIf', SupportedCrossFieldValidators.requireIf],
  ['requireIfMatch', SupportedCrossFieldValidators.requireIfMatch],
  ['isLessThan', SupportedCrossFieldValidators.numberSiblingValidator('lessThan')],
  ['isGreaterThan', SupportedCrossFieldValidators.numberSiblingValidator('greaterThan')],
  ['isEqualTo', SupportedCrossFieldValidators.numberSiblingValidator('equalTo')],
  ['isLessOrEqual', SupportedCrossFieldValidators.numberSiblingValidator('lessOrEqual')],
  ['isGreaterOrEqual', SupportedCrossFieldValidators.numberSiblingValidator('greaterOrEqual')],
  ['isDateBefore', SupportedCrossFieldValidators.dateSiblingValidator('dateBefore')],
  ['isDateAfter', SupportedCrossFieldValidators.dateSiblingValidator('dateAfter')],
  ['isDateOn', SupportedCrossFieldValidators.dateSiblingValidator('dateOn')],
  ['isDateOnOrBefore', SupportedCrossFieldValidators.dateSiblingValidator('dateOnOrBefore')],
  ['isDateOnOrAfter', SupportedCrossFieldValidators.dateSiblingValidator('dateOnOrAfter')],
]);
