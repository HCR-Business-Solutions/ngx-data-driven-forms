import {FieldItem, TextInputComponent} from '../components';

export const BASE_COMPONENTS_MAP: Map<string, FieldItem> = new Map<string, FieldItem>([
  ['text', new FieldItem(TextInputComponent)],
]);
