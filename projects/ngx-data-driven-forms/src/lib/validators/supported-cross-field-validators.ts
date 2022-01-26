import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ObjectUtils} from '../utils/object';

export class SupportedCrossFieldValidators {

  public static requireIf(targetId: string, siblingId: string): ValidatorFn {

    return (control: AbstractControl) => {

      const target = control.get(targetId);
      const sibling = control.get(siblingId);
      if(!target || !sibling) return null;

      const targetPresent = ObjectUtils.hasValue(target.value);
      const siblingPresent = ObjectUtils.hasValue(sibling.value);

      if (!sibling) return null;
      const errors = siblingPresent && !targetPresent ? {required: true} : null;

      target.setErrors(errors);

      return errors;

    }

  }

}
