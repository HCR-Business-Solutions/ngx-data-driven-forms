import { numberHandler, textHandler } from '../logic/data-handlers';
import { DataHandlerFunction } from '../../../shared/types';

export const DEFAULT_DATA_HANDLER_MAP = new Map<string, DataHandlerFunction<any>>([
  ['text',  textHandler],
  ['number', numberHandler],
]);
