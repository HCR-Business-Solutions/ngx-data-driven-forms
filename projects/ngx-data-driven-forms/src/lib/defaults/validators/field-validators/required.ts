import { AbstractControl, Validators } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const required: FieldValidatorFn = (arg: unknown) =>
  !(arg as boolean) ? undefined : Validators.required;
