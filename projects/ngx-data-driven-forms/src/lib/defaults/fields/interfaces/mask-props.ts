export interface MaskProps {
  mask: string;
  prefix: string;
  suffix: string;
  dropSpecialCharacters: boolean | string[];
  showMaskTyped: boolean;
  placeHolderCharacter: string;
  clearIfNotMatch: boolean;
  allowNegativeNumbers: boolean;
  thousandSeparator: string;
  leadZeroDateTime: boolean;
  validation: boolean;
  hiddenInput: boolean;
}
