import { AbstractControl } from '@angular/forms';
import { FieldValidatorFn } from 'ngx-data-driven-forms/src/lib/core';

export const falsy: FieldValidatorFn = (arg: unknown) =>
  !(arg as boolean)
    ? undefined
    : (c: AbstractControl) => (!c.value ? null : { falsy: true });
