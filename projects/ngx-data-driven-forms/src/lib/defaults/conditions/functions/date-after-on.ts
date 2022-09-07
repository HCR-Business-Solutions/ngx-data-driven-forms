import { ConditionFn } from 'ngx-data-driven-forms/src/lib/core/types';
import normalizeDate from '../../utils/normalize-date';

export const dateAfterOn: ConditionFn = (left: unknown, right: unknown) => {
  const l = left as any;
  const r = right as any;
  if (l === null || l === undefined || r === null || r === undefined)
    return false;
  const lDate = normalizeDate(l, true);
  const rDate = normalizeDate(r, true);
  return lDate.valueOf() >= rDate.valueOf();
};
