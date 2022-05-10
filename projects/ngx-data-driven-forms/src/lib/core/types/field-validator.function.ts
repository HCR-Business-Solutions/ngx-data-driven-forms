import { ValidatorFn } from '@angular/forms';

export type FieldValidatorFn = (validatorArg: unknown) => ValidatorFn | undefined;
