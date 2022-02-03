import {isOptions} from '../field-configs/options';

export const BASE_FIELD_CONFIG_VALIDATORS = new Map([
  ['select', isOptions],
  ['radio', isOptions],
  ['checkbox', isOptions],
]);
