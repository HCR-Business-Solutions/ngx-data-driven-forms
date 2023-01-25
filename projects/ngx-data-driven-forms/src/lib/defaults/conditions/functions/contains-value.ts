import { ConditionFn } from '../../../core';

export const containsValue: ConditionFn = (left: unknown, right: unknown) => {
  const l = Array.isArray(left) ? (left as any[]) : (left as string);
  const lArr = Array.isArray(l) ? l : JSON.parse(l ?? '[]');

  const r = right as any;

  return lArr.includes(r);
};
