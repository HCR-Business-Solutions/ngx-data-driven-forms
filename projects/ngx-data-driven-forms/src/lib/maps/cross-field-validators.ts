import {NormalizedCrossFieldValidator} from '../types';
import { SupportedCrossFieldValidators } from '../validators/supported-cross-field-validators';

export const BASE_CROSS_FIELD_VALIDATORS_MAP: Map<string, NormalizedCrossFieldValidator> = new Map<string, NormalizedCrossFieldValidator>([
  ['requireIf', SupportedCrossFieldValidators.requireIf],
  ['requireIfMatch', SupportedCrossFieldValidators.requireIfMatch],
  ['isLessThan', SupportedCrossFieldValidators.isLessThanSibling],
  ['isGreaterThan', SupportedCrossFieldValidators.isGreaterThanSibling],
  ['isEqualTo', SupportedCrossFieldValidators.isEqualToSibling],
  ['isLessOrEqual', SupportedCrossFieldValidators.isLessOrEqualSibling],
  ['isGreaterOrEqual', SupportedCrossFieldValidators.isGreaterOrEqualSibling],
  ['isDateBefore', SupportedCrossFieldValidators.dateSiblingValidator('before')],
  ['isDateAfter', SupportedCrossFieldValidators.dateSiblingValidator('after')],
  ['isDateOn', SupportedCrossFieldValidators.dateSiblingValidator('on')],
  ['isDateOnOrBefore', SupportedCrossFieldValidators.dateSiblingValidator('onOrBefore')],
  ['isDateOnOrAfter', SupportedCrossFieldValidators.dateSiblingValidator('onOrAfter')],
])
