import { Validators } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const minLength: FieldValidatorFn = (arg: unknown) =>
  (arg as number) === null || (arg as number) === undefined
    ? undefined
    : Validators.minLength(arg as number);
