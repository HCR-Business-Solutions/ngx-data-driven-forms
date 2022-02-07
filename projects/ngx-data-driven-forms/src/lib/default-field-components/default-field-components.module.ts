import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';

const FIELDS = [
  Components.ButtonFieldComponent,
  Components.CheckboxFieldComponent,
  Components.CurrencyFieldComponent,
  Components.DateFieldComponent,
  Components.EmailFieldComponent,
  Components.MonthFieldComponent,
  Components.NumberFieldComponent,
  Components.PasswordFieldComponent,
  Components.RadioFieldComponent,
  Components.RangeFieldComponent,
  Components.SearchFieldComponent,
  Components.SsnFieldComponent,
  Components.TelFieldComponent,
  Components.TextFieldComponent,
  Components.TextareaFieldComponent,
  Components.TimeFieldComponent,
  Components.UrlFieldComponent,
  Components.WeekFieldComponent,
];

@NgModule({
  declarations: [
    ...FIELDS,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DefaultFieldComponentsModule { }
