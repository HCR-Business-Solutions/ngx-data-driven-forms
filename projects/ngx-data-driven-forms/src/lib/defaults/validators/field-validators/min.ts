import { AbstractControl, Validators } from '@angular/forms';
import { FieldValidatorFn } from '../../../core';

export const min: FieldValidatorFn = (arg: unknown) =>
  (arg as number) === null || (arg as number) === undefined
    ? undefined
    : Validators.min(arg as number);
