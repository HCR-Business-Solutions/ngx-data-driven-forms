export interface ICrossFieldValidationPack {
  sibling: string;
  expectedParentLevel: number;
  validation: { [key: string]: any };
}
