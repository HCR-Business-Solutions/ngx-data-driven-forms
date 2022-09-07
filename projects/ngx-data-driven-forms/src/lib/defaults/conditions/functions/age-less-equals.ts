import { ConditionFn } from '../../../core';
import calcAge from '../../utils/calc-age';
import normalizeDate from '../../utils/normalize-date';

export const ageLessEquals: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as any;
  if (l === null || l === undefined || r === null || r === undefined)
    return false;

  const lDate = normalizeDate(l, true);
  const rVal = Number(r);
  if (rVal === NaN) return false;
  const age = calcAge(lDate);
  return age <= rVal;
};
