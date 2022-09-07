import { ConditionFn } from 'ngx-data-driven-forms/src/lib/core/types';

export const valueNotMatch: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as any;
  if (l === undefined) return false;
  return l !== r;
};
