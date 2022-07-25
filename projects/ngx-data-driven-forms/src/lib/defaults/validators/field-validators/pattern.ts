import { AbstractControl, Validators } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const pattern: FieldValidatorFn = (arg: unknown) =>
  Validators.pattern((arg as string) ?? '');
