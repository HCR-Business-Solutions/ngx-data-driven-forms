import { ErrorMessageFunction } from '../types';

export const BASE_MESSAGE_HANDLER_MAP: Map<string, ErrorMessageFunction> = new Map<string, ErrorMessageFunction>([
  ['required', () => 'This input is required'],
])
