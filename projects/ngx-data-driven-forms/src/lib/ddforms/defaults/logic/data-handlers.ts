import { DataHandlerFunction } from '../../../shared/types';

export const textHandler: DataHandlerFunction<any> = (data) => String(data);

export const numberHandler: DataHandlerFunction<any> = (data) => Number(data);
