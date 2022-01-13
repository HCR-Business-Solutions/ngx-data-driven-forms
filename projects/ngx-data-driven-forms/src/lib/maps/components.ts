import {
  FieldItem,
  TextFieldComponent,
  ButtonFieldComponent,
  RadioFieldComponent,
} from '../components';
import { NumberFieldComponent } from '../components/base-fields/number-field/number-field.component';

export const BASE_COMPONENTS_MAP: Map<string, FieldItem> = new Map<
  string,
  FieldItem
>([
  ['text', new FieldItem(TextFieldComponent)],
  ['button', new FieldItem(ButtonFieldComponent)],
  ['number', new FieldItem(NumberFieldComponent)],
  ['radio', new FieldItem(RadioFieldComponent)],
]);
