import {DataHandlerFunction} from '../../../shared/types';

export const textHandler: DataHandlerFunction<any> = (data) => data !== null && data !== undefined ? String(data) : null;

export const numberHandler: DataHandlerFunction<any> = (data) => data !== null && data !== undefined ? Number(data) : null;
