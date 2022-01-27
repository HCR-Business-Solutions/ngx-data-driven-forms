import {NormalizedCrossFieldValidator} from '../types';
import { SupportedCrossFieldValidators } from '../validators/supported-cross-field-validators';

export const BASE_CROSS_FIELD_VALIDATORS_MAP: Map<string, NormalizedCrossFieldValidator> = new Map<string, NormalizedCrossFieldValidator>([
  ['requireIf', SupportedCrossFieldValidators.requireIf]
])
