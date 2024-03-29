import { AbstractControl } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const numberLessEquals: FieldValidatorFn = (arg: unknown) =>
  (arg as number) === null || (arg as number) === undefined
    ? undefined
    : (c: AbstractControl) => {
        const expected = (arg as number) ?? null;
        if (expected === null) return null;
        const actual = c.value ?? null;
        if (actual === null) return null;
        return actual <= expected
          ? null
          : { numberLessEquals: { actual, expected } };
      };
