import {ConditionsFunction, DataHandlerFunction, ErrorMessageFunction, NormalizedValidator} from './types';
import {FieldItem} from './_classes';

export interface DefaultState {

  defaultComponents: Map<string, FieldItem>,
  defaultConditions: Map<string, ConditionsFunction>,
  defaultDataHandlers: Map<string, DataHandlerFunction<any>>,
  defaultMessageHandlers: Map<string, ErrorMessageFunction>,
  defaultValidators: Map<string, NormalizedValidator>,

}
