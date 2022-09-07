import { AbstractControl } from '@angular/forms';
import { CrossFieldValidatorFn } from '../../../core/types';
export const requireIf: CrossFieldValidatorFn = (
  targetId: string,
  siblingId: string,
  validatorArg: any
) => {
  if (!validatorArg) return undefined;
  return (c: AbstractControl) => {
    const target = c.get(targetId),
      sibling = c.get(siblingId);
    if (!target || !sibling) return null;
    const targetVal = target.value,
      siblingVal = sibling.value;
    if (siblingVal === null || siblingVal === undefined) return null;
    const errors = !targetVal ? { required: siblingId } : null;
    const totalErrors =
      errors || target.errors
        ? { ...(errors ?? {}), ...(target.errors ?? {}) }
        : null;
    target.setErrors(totalErrors);
    return errors;
  };
};
