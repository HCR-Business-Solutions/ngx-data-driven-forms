import { Validators } from '@angular/forms';
import { FieldValidatorFn } from 'ngx-data-driven-forms/src/lib/core';

export const max: FieldValidatorFn = (arg: unknown) =>
  (arg as number) === null || (arg as number) === undefined
    ? undefined
    : Validators.max(arg as number);
