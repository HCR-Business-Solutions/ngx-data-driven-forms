import {SupportedLogicUtils} from '../utils/supported-logic';
import {ConditionsFunction} from '../types/conditions-function';

export const BASE_CONDITIONS_MAP = new Map<string, ConditionsFunction>([
  ['hasValue', SupportedLogicUtils.hasValue],
  ['valueMatches', SupportedLogicUtils.valueMatches],
  ['pattern', SupportedLogicUtils.pattern],
  ['isLessThan', SupportedLogicUtils.isLessThen],
  ['isGreaterThan', SupportedLogicUtils.isGreaterThan],
  ['isEqualTo', SupportedLogicUtils.isEqualTo],
  ['isLessOrEqual', SupportedLogicUtils.isLessOrEqual],
  ['isGreaterOrEqual', SupportedLogicUtils.isGreaterOrEqual],
  ['isTruthy', SupportedLogicUtils.isTruthy],
  ['isFalsy', SupportedLogicUtils.isFalsy],
  ['isDate', SupportedLogicUtils.isDate],
  ['isDateBefore', SupportedLogicUtils.isDateBefore],
  ['isDateAfter', SupportedLogicUtils.isDateAfter],
  ['isDateOn', SupportedLogicUtils.isDateOn],
  ['isDateOnOrBefore', SupportedLogicUtils.isDateOnOrBefore],
  ['isDateOnOrAfter', SupportedLogicUtils.isDateOnOrAfter],
  ['isAgeGreaterThan', SupportedLogicUtils.isAgeGreaterThan],
  ['isAgeLessThan', SupportedLogicUtils.isAgeLessThan],
  ['isAgeEqualTo', SupportedLogicUtils.isAgeEqualTo],
  ['isAgeGreaterOrEqual', SupportedLogicUtils.isAgeGreaterOrEqual],
  ['isAgeLessOrEqual', SupportedLogicUtils.isAgeLessOrEqual],
]);
