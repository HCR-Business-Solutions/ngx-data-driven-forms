import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CrossFieldValidatorRegistryService,
  DDFormsCoreModule,
  FieldValidatorRegistryService,
} from '../../core';
import * as FieldValidators from './field-validators';
import * as CrossFieldValidators from './cross-field-validators';

@NgModule({
  declarations: [],
  imports: [CommonModule, DDFormsCoreModule],
})
export class DDFormsDefaultValidatorsModule {
  constructor(
    private fieldValidator: FieldValidatorRegistryService,
    private crossFieldValidator: CrossFieldValidatorRegistryService
  ) {
    // #region field validators

    // #region age validators
    this.fieldValidator.register('ageEquals', FieldValidators.ageEquals);
    this.fieldValidator.register(
      'ageGreaterEquals',
      FieldValidators.ageGreaterEquals
    );
    this.fieldValidator.register('ageGreater', FieldValidators.ageGreater);
    this.fieldValidator.register(
      'ageLessEquals',
      FieldValidators.ageLessEquals
    );
    this.fieldValidator.register('ageLess', FieldValidators.ageLess);
    // #endregion age validators

    // #region date validators
    this.fieldValidator.register('dateAfterOn', FieldValidators.dateAfterOn);
    this.fieldValidator.register('dateAfter', FieldValidators.dateAfter);
    this.fieldValidator.register('dateBeforeOn', FieldValidators.dateBeforeOn);
    this.fieldValidator.register('dateBefore', FieldValidators.dateBefore);
    this.fieldValidator.register('dateOn', FieldValidators.dateOn);
    // #endregion date validators

    this.fieldValidator.register('email', FieldValidators.email);

    this.fieldValidator.register('hasValue', FieldValidators.hasValue);
    this.fieldValidator.register('noValue', FieldValidators.noValue);

    this.fieldValidator.register('maxLength', FieldValidators.maxLength);
    this.fieldValidator.register('max', FieldValidators.max);

    this.fieldValidator.register('minLength', FieldValidators.minLength);
    this.fieldValidator.register('min', FieldValidators.min);

    // #region number validators
    this.fieldValidator.register('numberEquals', FieldValidators.numberEquals);
    this.fieldValidator.register(
      'numberGreaterEquals',
      FieldValidators.numberGreaterEquals
    );
    this.fieldValidator.register(
      'numberGreater',
      FieldValidators.numberGreater
    );
    this.fieldValidator.register(
      'numberLessEquals',
      FieldValidators.numberLessEquals
    );
    this.fieldValidator.register('numberLess', FieldValidators.numberLess);
    // #endregion number validators

    this.fieldValidator.register('pattern', FieldValidators.pattern);

    this.fieldValidator.register('required', FieldValidators.required);
    this.fieldValidator.register('requiredTrue', FieldValidators.requiredTrue);

    // #endregion field validators

    // #region crossfield validators
    this.crossFieldValidator.register('order', CrossFieldValidators.order);

    this.crossFieldValidator.register(
      'requireIf',
      CrossFieldValidators.requireIf
    );
    this.crossFieldValidator.register(
      'requireIfMatch',
      CrossFieldValidators.requireIfMatch
    );
    // #endregion crossfield validators
  }
}
