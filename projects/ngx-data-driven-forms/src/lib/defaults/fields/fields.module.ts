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
import * as FieldComponents from './components';

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
    genericInputTypes.forEach((inputType) => {
      this._fieldRegistry.register(
        inputType,
        FieldComponents.GenericTextBasedFieldComponent
      );
    });

    this._fieldRegistry.register(
      'textarea',
      FieldComponents.TextareaFieldComponent
    );

    this._fieldRegistry.register(
      'select',
      FieldComponents.SelectFieldComponent
    );
  }
}
