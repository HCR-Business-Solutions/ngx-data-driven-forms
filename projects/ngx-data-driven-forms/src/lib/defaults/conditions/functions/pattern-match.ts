import { ConditionFn } from 'ngx-data-driven-forms/src/lib/core/types';

export const patternMatch: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as any;
  const rType = typeof r;
  const lType = typeof l;
  if (l === undefined) return false;
  if (rType !== 'string' || lType !== 'string') return false;
  return new RegExp(r as string).test(l as string);
};
