import { AbstractControl } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const noValue: FieldValidatorFn = (arg: unknown) =>
  !(arg as boolean)
    ? undefined
    : (c: AbstractControl) => (!c.value ? null : { noValue: true });
