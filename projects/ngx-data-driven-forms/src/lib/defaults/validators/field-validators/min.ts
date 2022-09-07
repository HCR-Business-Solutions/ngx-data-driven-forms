import { AbstractControl, Validators } from '@angular/forms';
import { FieldValidatorFn } from 'ngx-data-driven-forms/src/public-api';

export const min: FieldValidatorFn = (arg: unknown) =>
  (arg as number) === null || (arg as number) === undefined
    ? undefined
    : Validators.min(arg as number);
