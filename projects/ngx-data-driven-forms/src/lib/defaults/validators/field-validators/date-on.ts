import { AbstractControl } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';
import normalizeDate from '../../utils/normalize-date';

export const dateOn: FieldValidatorFn = (arg: unknown) => {
  const date = normalizeDate(arg as any, true);
  if (!date) return undefined;
  return (c: AbstractControl) => {
    const expected = date;
    if (expected === null) return null;
    const actual = c.value ? normalizeDate(c.value, true) : undefined;
    if (!actual) return null;
    return actual.valueOf() == expected.valueOf()
      ? null
      : { dateOn: { actual, expected } };
  };
};
