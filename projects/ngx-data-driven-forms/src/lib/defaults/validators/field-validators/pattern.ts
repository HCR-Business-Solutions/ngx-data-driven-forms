import { AbstractControl, Validators } from '@angular/forms';
import { FieldValidatorFn } from 'ngx-data-driven-forms/src/lib/core';

export const pattern: FieldValidatorFn = (arg: unknown) =>
  Validators.pattern((arg as string) ?? '');
