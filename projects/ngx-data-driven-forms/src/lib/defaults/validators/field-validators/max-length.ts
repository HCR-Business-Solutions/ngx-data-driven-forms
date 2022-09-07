import { Validators } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const maxLength: FieldValidatorFn = (arg: unknown) =>
  (arg as number) === null || (arg as number) === undefined
    ? undefined
    : Validators.maxLength(arg as number);
