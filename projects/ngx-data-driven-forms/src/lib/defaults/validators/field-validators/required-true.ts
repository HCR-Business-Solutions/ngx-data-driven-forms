import { Validators } from '@angular/forms';
import { FieldValidatorFn } from 'ngx-data-driven-forms/src/lib/core';

export const requiredTrue: FieldValidatorFn = (arg: unknown) =>
  !arg ? undefined : Validators.requiredTrue;
