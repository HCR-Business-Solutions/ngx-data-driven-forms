import { Validators } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const requiredTrue: FieldValidatorFn = (arg: unknown) =>
  !arg ? undefined : Validators.requiredTrue;
