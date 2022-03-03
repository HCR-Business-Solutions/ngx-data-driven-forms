import {IQuestionValidation} from './question-validation';
import {IStatements} from './statements';
import {ICustomValidation} from './custom-validation';
import {ICrossFieldValidatorPackage} from './cross-field-validator-package';

export interface IQuestion {

  id: string;
  type: string;

  label?: string;
  ariaLabel?: string;
  placeholder?: string;

  hint?: {
    text: string;
    style?: 'markdown' | 'plaintext'; // Defaults to plaintext;
  };

  readonly?: boolean; // Field appears but is not editable
  isFlag?: boolean; // Field is hidden.

  fieldConfig?: unknown;


  validation?: IQuestionValidation;
  customValidation?: ICustomValidation;
  crossFieldValidation?: ICrossFieldValidatorPackage[];

  shouldAsk?: IStatements;
  retainWhenNotAsked?: boolean;


}
