import { AbstractControl, Validators } from '@angular/forms';
import { FieldValidatorFn } from 'ngx-data-driven-forms/src/lib/core';

export const required: FieldValidatorFn = (arg: unknown) =>
  !(arg as boolean) ? undefined : Validators.required;
