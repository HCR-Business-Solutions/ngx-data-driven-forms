import { Type } from '@angular/core';
import { ConditionsFunction, DataHandlerFunction, ErrorMessageFunction, FieldConfigValidator, NormalizedCrossFieldValidator, NormalizedValidator } from '../../shared/types';

export interface IModuleConfig {
  staticValues?: {
    components?: Map<string, Type<any>>;
    conditions?: Map<string, ConditionsFunction>;
    crossFieldValidators?: Map<string, NormalizedCrossFieldValidator>;
    dataHandlers?: Map<string, DataHandlerFunction<any>>;
    fieldConfigValidators?: Map<string, FieldConfigValidator>;
    messageHandlers?: Map<string, ErrorMessageFunction>;
    validators?: Map<string, NormalizedValidator>;
  };

  skipDefaults?: {
    components?: boolean;
    conditions?: boolean;
    crossFieldValidators?: boolean;
    dataHandlers?: boolean;
    fieldConfigValidators?: boolean;
    messageHandlers?: boolean;
    validators?: boolean;
  };

  skipDefaultStyles?: boolean;

}
