import { AbstractControl } from '@angular/forms';
import { CrossFieldValidatorFn } from '../../../core/types';

export const order: CrossFieldValidatorFn = (
  targetId: string,
  siblingId: string,
  validatorArg: any
) => {
  if (!validatorArg) return undefined;
  if (typeof validatorArg !== 'string') return undefined;
  const comparisons: { [key: string]: (l: number, r: number) => boolean } = {
    BEFORE: (l: number, r: number) => l < r,
    BEFORE_ON: (l: number, r: number) => l <= r,
    ON: (l: number, r: number) => l == r,
    AFTER: (l: number, r: number) => l > r,
    AFTER_ON: (l: number, r: number) => l >= r,
  };
  const compFn = comparisons[validatorArg] ?? undefined;
  if (!compFn) return undefined;
  return (c: AbstractControl) => {
    const target = c.get(targetId),
      sibling = c.get(siblingId);
    if (!target || !sibling) return null;
    const targetVal = target.value,
      siblingVal = sibling.value;
    if (![siblingVal, targetVal].every((_) => _ !== null && _ !== undefined))
      return null;
    let left: number | undefined, right: number | undefined;
    let dataType: string | undefined;
    if (Date.parse(siblingVal) && Date.parse(targetVal)) {
      dataType = 'date';
      const siblingDate = new Date(siblingVal),
        targetDate = new Date(targetVal);
      left = targetDate.valueOf();
      right = siblingDate.valueOf();
    } else if (Number(siblingVal) !== NaN && Number(targetVal) !== NaN) {
      dataType = 'number';
      left = Number(targetVal);
      right = Number(siblingVal);
    }

    if (!left || !right) return null;
    const errors = compFn(left, right)
      ? null
      : {
          order: {
            dataType: dataType ?? 'unknown',
            orderType: validatorArg,
            expected: right,
            actual: left,
          },
        };
    const totalErrors =
      errors || target.errors
        ? { ...(errors ?? {}), ...(target.errors ?? {}) }
        : null;
    target.setErrors(totalErrors);
    return errors;
  };
};
