import * as MessageHandlers from '../logic/message-handler';
import { ErrorMessageFunction } from '../../../shared/types';

export const DEFAULT_MESSAGE_HANDLER_MAP = new Map<string, ErrorMessageFunction>([
  ['required', MessageHandlers.requiredError],
]);
