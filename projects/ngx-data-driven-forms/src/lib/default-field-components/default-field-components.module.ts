import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as Components from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { NgxMaskModule } from 'ngx-mask';


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
  Components.SsnFieldComponent,
  Components.TelFieldComponent,
  Components.TextFieldComponent,
  Components.TextareaFieldComponent,
  Components.TimeFieldComponent,
  Components.UrlFieldComponent,
  Components.WeekFieldComponent,
  Components.SelectFieldComponent,
  Components.DatetimelocalFieldComponent,
  Components.MaskFieldComponent,
];

@NgModule({
  declarations: [
    ...FIELDS,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
    SharedModule
  ],
  exports: [
    ...FIELDS,
    NgxMaskModule,
    ReactiveFormsModule,
  ]
})
export class DefaultFieldComponentsModule { }
