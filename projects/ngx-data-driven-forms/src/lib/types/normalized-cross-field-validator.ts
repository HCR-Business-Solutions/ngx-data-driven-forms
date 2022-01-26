import {ValidatorFn} from '@angular/forms';

export type NormalizedCrossFieldValidator = (targetId: string, siblingId: string, arg: any) => ValidatorFn;
