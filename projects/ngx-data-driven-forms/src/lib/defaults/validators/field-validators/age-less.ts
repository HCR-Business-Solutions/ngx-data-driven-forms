import { AbstractControl } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';
import calcAge from '../../utils/calc-age';
import normalizeDate from '../../utils/normalize-date';

export const ageLess: FieldValidatorFn = (arg: unknown) =>
  (arg as number) === null || (arg as number) === undefined
    ? undefined
    : (c: AbstractControl) => {
        const expected = (arg as number) ?? null;
        if (expected === null) return null;
        const actual = c.value
          ? calcAge(normalizeDate(c.value, true))
          : undefined;
        if (!actual) return null;
        return actual < expected ? null : { ageLess: { actual, expected } };
      };
