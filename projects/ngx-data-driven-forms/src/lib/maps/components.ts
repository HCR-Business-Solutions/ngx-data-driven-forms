import {ButtonFieldComponent, NumberFieldComponent, RadioFieldComponent, TextFieldComponent,} from '../components';
import {FieldItem} from '../_classes';

export const BASE_COMPONENTS_MAP: Map<string, FieldItem> = new Map<string,
  FieldItem>([
  ['text', new FieldItem(TextFieldComponent)],
  ['button', new FieldItem(ButtonFieldComponent)],
  ['number', new FieldItem(NumberFieldComponent)],
  ['radio', new FieldItem(RadioFieldComponent)],
]);
