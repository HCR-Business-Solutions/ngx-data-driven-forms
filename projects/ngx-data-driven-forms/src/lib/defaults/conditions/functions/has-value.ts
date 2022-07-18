import { ConditionFn } from 'ngx-data-driven-forms/src/lib/core/types';

export const hasValue: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as boolean;
  if (!r) return true;
  return l !== null && l !== undefined;
};
