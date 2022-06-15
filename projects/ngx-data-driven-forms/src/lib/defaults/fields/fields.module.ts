import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DEFAULT_FIELDS } from './components/list';
import {
  DDFormsCoreModule,
  FieldRendererRegistryService,
  FieldSchemaValidatorRegistryService,
  FieldValidatorRegistryService,
} from '../../core';
import { ReactiveFormsModule } from '@angular/forms';
import { GenericTextBasedFieldComponent } from './components';

@NgModule({
  declarations: [...DEFAULT_FIELDS],
  imports: [CommonModule, DDFormsCoreModule, ReactiveFormsModule],
  exports: [...DEFAULT_FIELDS],
})
export class DDFormsDefaultFieldsModule {
  constructor(
    private _fieldRegistry: FieldRendererRegistryService,
    private _fieldSchema: FieldSchemaValidatorRegistryService
  ) {
    const genericInputTypes = [
      'text',
      'date',
      'datetime-local',
      'month',
      'week',
      'time',
      'email',
      'url',
      'number',
      'password',
    ];
    console.log('registering fields');
    genericInputTypes.forEach((inputType) => {
      this._fieldRegistry.register(inputType, GenericTextBasedFieldComponent);
    });
    console.log(this._fieldRegistry.getRegistry());
  }
}
