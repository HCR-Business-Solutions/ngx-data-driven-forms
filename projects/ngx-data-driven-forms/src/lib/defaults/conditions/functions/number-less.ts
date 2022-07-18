import { ConditionFn } from 'ngx-data-driven-forms/src/lib/core/types';

export const numberLess: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as any;
  if (l === undefined || r === undefined || l === null || r === null)
    return false;
  const lVal = Number(l);
  const rVal = Number(r);
  if (lVal === NaN || rVal === NaN) return false;
  return lVal < rVal;
};
