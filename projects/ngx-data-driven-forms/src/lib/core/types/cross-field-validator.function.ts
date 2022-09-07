import { ValidatorFn } from '@angular/forms';

export type CrossFieldValidatorFn = (targetId: string, siblingId: string, validatorArg: unknown) => ValidatorFn | undefined;
