import { IConditionPack } from './condition-pack';

export interface IShouldAsk {
  conditions: IConditionPack[];
  checkAll?: boolean;
  retain?: boolean;
}
