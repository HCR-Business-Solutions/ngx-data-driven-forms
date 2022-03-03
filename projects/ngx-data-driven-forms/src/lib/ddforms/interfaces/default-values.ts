import {Type} from '@angular/core';
import {
  ConditionsFunction,
  DataHandlerFunction,
  ErrorMessageFunction,
  FieldConfigValidator,
  NormalizedCrossFieldValidator,
  NormalizedValidator,
} from '../../shared/types';

export interface IDefaultValues {
  components?: Map<string, Type<any>>;
  conditions?: Map<string, ConditionsFunction>;
  crossFieldValidators?: Map<string, NormalizedCrossFieldValidator>;
  dataHandlers?: Map<string, DataHandlerFunction<any>>;
  fieldConfigValidators?: Map<string, FieldConfigValidator>;
  messageHandlers?: Map<string, ErrorMessageFunction>;
  validators?: Map<string, NormalizedValidator>;
}
