export interface IConditionPack {
  sibling: string;
  expectedParentLevel: number;
  conditions: { [key: string]: any };
  checkAll?: boolean;
}
