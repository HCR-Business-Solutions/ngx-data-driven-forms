import { FieldItem } from './components';
import { ConditionsFunction, ErrorMessageFunction, NormalizedValidator } from './types';

export interface DataDrivenFormsConfig {
  ignoreDefaultStyles?: boolean;
  customValidators?: Map<string, NormalizedValidator>;
  customConditions?: Map<string, ConditionsFunction>;
  customFieldComponents?: Map<string, FieldItem>;
  customErrorMessageHandlers?: Map<string, ErrorMessageFunction>;
}
