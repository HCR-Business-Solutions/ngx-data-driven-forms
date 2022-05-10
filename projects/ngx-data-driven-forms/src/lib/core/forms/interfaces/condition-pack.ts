export interface IConditionPack {
  siblingPath: string;
  conditions: { [key: string]: any };
  checkAll?: boolean;
}
