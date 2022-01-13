import { DataHandlerFunction } from '..';

export const BASE_DATA_HANDLER_MAP: Map<string, DataHandlerFunction<any>> = new Map<
  string,
  DataHandlerFunction<any>
>([

  ['text', (data) => String(data)],
  ['number', (data)=>Number(data)],

]);
