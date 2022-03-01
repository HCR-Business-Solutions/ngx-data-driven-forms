import * as MessageHandlers from '../logic/message-handler';
import { ErrorMessageFunction } from '../../../shared/types';

export const DEFAULT_MESSAGE_HANDLER_MAP = new Map<string, ErrorMessageFunction>([
  ['min', MessageHandlers.min],
  ['max', MessageHandlers.max],
  ['required', MessageHandlers.required],
  ['email', MessageHandlers.email],
  ['minlength', MessageHandlers.minLength],
  ['maxlength', MessageHandlers.maxLength],
  ['pattern', MessageHandlers.pattern],
]);
