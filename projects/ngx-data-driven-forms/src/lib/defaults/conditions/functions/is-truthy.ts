import { ConditionFn } from '../../../core';

export const isTruthy: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as boolean;
  if (!r) return true;
  return !!l;
};
