import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConditionsRegistryService } from '../../core';
import * as Conditions from './functions';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class DDFormsDefaultConditionsModule {
  constructor(private _conditionsRegistry: ConditionsRegistryService) {
    this._conditionsRegistry.register('ageEquals', Conditions.ageEquals);
    this._conditionsRegistry.register(
      'ageGreaterEquals',
      Conditions.ageGreaterEquals
    );
    this._conditionsRegistry.register('ageGreater', Conditions.ageGreater);
    this._conditionsRegistry.register(
      'ageLessEquals',
      Conditions.ageLessEquals
    );
    this._conditionsRegistry.register('ageLess', Conditions.ageLess);

    this._conditionsRegistry.register('dateAfterOn', Conditions.dateAfterOn);
    this._conditionsRegistry.register('dateAfter', Conditions.dateAfter);
    this._conditionsRegistry.register('dateBeforeOn', Conditions.dateBeforeOn);
    this._conditionsRegistry.register('dateBefore', Conditions.dateBefore);
    this._conditionsRegistry.register('dateOn', Conditions.dateOn);

    this._conditionsRegistry.register('hasValue', Conditions.hasValue);
    this._conditionsRegistry.register('noValue', Conditions.noValue);

    this._conditionsRegistry.register('numberEquals', Conditions.numberEquals);
    this._conditionsRegistry.register(
      'numberGreaterEquals',
      Conditions.numberGreaterEquals
    );
    this._conditionsRegistry.register(
      'numberGreater',
      Conditions.numberGreater
    );
    this._conditionsRegistry.register(
      'numberLessEquals',
      Conditions.numberLessEquals
    );
    this._conditionsRegistry.register('numberLess', Conditions.numberLess);

    this._conditionsRegistry.register('patternMatch', Conditions.patternMatch);
    this._conditionsRegistry.register(
      'patternNotMatch',
      Conditions.patternNotMatch
    );

    this._conditionsRegistry.register('valueMatch', Conditions.valueMatch);
    this._conditionsRegistry.register(
      'valueNotMatch',
      Conditions.valueNotMatch
    );
  }
}
