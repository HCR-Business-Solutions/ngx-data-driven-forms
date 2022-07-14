import { Validators } from '@angular/forms';
import { FieldValidatorFn } from 'ngx-data-driven-forms/src/lib/core';

export const email: FieldValidatorFn = (arg: unknown) =>
  !arg ? undefined : Validators.email;
