import { FieldItem } from './components';
import { ConditionsFunction, DataHandlerFunction, ErrorMessageFunction, NormalizedValidator } from './types';

export interface DataDrivenFormsConfig {
  ignoreDefaultStyles?: boolean;
  customValidators?: Map<string, NormalizedValidator>;
  customConditions?: Map<string, ConditionsFunction>;
  customFieldComponents?: Map<string, FieldItem>;
  customDataHandlers?: Map<string, DataHandlerFunction<any>>;
  customErrorMessageHandlers?: Map<string, ErrorMessageFunction>;
}
