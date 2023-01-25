import { AbstractControl } from '@angular/forms';
import { FieldValidatorFn } from '../../../core/types';

export const jsonRequired: FieldValidatorFn = (arg: unknown) =>
  !(arg as boolean)
    ? undefined
    : (c: AbstractControl) => {
        if (!c.value) return { required: true };
        const json = JSON.parse(c.value ?? '[]');
        if (!json) return { required: true };
        return null;
      };
