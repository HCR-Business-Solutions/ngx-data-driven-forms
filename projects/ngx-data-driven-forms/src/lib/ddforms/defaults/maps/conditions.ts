import {ConditionsFunction} from '../../../shared/types';
import * as SupportedLogic from '../../../shared/utilities/validator-logic';

export const DEFAULT_CONDITIONS_MAP = new Map<string, ConditionsFunction>([
  ['hasValue', SupportedLogic.hasValue],
  ['valueMatches', SupportedLogic.valueMatches],
  ['pattern', SupportedLogic.pattern],
  ['isLessThan', SupportedLogic.isLessThan],
  ['isGreaterThan', SupportedLogic.isGreaterThan],
  ['isEqualTo', SupportedLogic.isEqualTo],
  ['isLessOrEqual', SupportedLogic.isLessOrEqual],
  ['isGreaterOrEqual', SupportedLogic.isGreaterOrEqual],
  ['isTruthy', SupportedLogic.isTruthy],
  ['isFalsy', SupportedLogic.isFalsy],
  ['isDate', SupportedLogic.isDate],
  ['isDateBefore', SupportedLogic.isDateBefore],
  ['isDateAfter', SupportedLogic.isDateAfter],
  ['isDateOn', SupportedLogic.isDateOn],
  ['isDateOnOrBefore', SupportedLogic.isDateOnOrBefore],
  ['isDateOnOrAfter', SupportedLogic.isDateOnOrAfter],
  ['isAgeGreaterThan', SupportedLogic.isAgeGreaterThan],
  ['isAgeLessThan', SupportedLogic.isAgeLessThan],
  ['isAgeEqualTo', SupportedLogic.isAgeEqualTo],
  ['isAgeGreaterOrEqual', SupportedLogic.isAgeGreaterOrEqual],
  ['isAgeLessOrEqual', SupportedLogic.isAgeLessOrEqual],
]);
