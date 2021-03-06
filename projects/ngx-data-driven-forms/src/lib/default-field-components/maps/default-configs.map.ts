import {FieldConfigValidator} from '../../shared/types';
import {validateMask, validateOptions} from '../field-configs';

export const DEFAULT_FIELD_CONFIG_MAP = new Map<string, FieldConfigValidator>([
  ['select', validateOptions],
  ['radio', validateOptions],
  ['checkbox', validateOptions],
  ['mask', validateMask],
]);
