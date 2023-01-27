import { ConditionFn } from '../../../core';

export const isFalsy: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as boolean;
  if (!r) return true;
  return !l;
};
