import { AbstractControl } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const hasValue: FieldValidatorFn = (arg: unknown) =>
  !(arg as boolean)
    ? undefined
    : (c: AbstractControl) => (!!c.value ? null : { hasValue: true });
