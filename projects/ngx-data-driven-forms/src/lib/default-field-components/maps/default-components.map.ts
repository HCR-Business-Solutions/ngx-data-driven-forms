import { Type } from '@angular/core';
import {
  ButtonFieldComponent,
  CheckboxFieldComponent,
  CurrencyFieldComponent,
  DateFieldComponent,
  EmailFieldComponent,
  MonthFieldComponent,
  NumberFieldComponent,
  PasswordFieldComponent,
  RadioFieldComponent,
  RangeFieldComponent,
  SsnFieldComponent,
  TelFieldComponent,
  TextareaFieldComponent,
  TextFieldComponent,
  TimeFieldComponent,
  UrlFieldComponent,
  WeekFieldComponent,
  SelectFieldComponent,
  DatetimelocalFieldComponent
} from '../components';

export const DEFAULT_FIELD_COMPONENT_MAP: Map<string, Type<any>> = new Map<
  string,
  Type<any>
>([
  ['button', ButtonFieldComponent],
  ['checkbox', CheckboxFieldComponent],
  ['currency', CurrencyFieldComponent],
  ['date', DateFieldComponent],
  ['email', EmailFieldComponent],
  ['month', MonthFieldComponent],
  ['number', NumberFieldComponent],
  ['password', PasswordFieldComponent],
  ['radio', RadioFieldComponent],
  ['range', RangeFieldComponent],
  ['ssn', SsnFieldComponent],
  ['tel', TelFieldComponent],
  ['text', TextFieldComponent],
  ['textarea', TextareaFieldComponent],
  ['time', TimeFieldComponent],
  ['url', UrlFieldComponent],
  ['week', WeekFieldComponent],
  ['select', SelectFieldComponent],
  ['datetime-local', DatetimelocalFieldComponent],
]);
