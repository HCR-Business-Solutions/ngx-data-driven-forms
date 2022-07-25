import { Validators } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const email: FieldValidatorFn = (arg: unknown) =>
  !arg ? undefined : Validators.email;
