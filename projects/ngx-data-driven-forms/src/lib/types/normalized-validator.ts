import {ValidatorFn} from '@angular/forms';

export type NormalizedValidator = (arg: any) => ValidatorFn | undefined;
