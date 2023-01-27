import { ConditionFn } from '../../../core';

export const isEmail: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as string;
  const r = right as boolean;

  if (!r) return true;

  const expr = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  return expr.test(l);
};
