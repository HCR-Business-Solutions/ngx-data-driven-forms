import { ConditionFn } from 'ngx-data-driven-forms/src/lib/core/types';
import calcAge from '../helpers/calc-age';
import normalizeDate from '../helpers/normalize-date';

export const ageLess: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as any;
  if (l === null || l === undefined || r === null || r === undefined)
    return false;

  const lDate = normalizeDate(l, true);
  const rVal = Number(r);
  if (rVal === NaN) return false;
  const age = calcAge(lDate);
  return age < rVal;
};
