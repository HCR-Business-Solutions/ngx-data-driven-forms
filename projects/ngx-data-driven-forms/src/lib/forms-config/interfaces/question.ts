import {IQuestionValidation} from './question-validation';
import {IQuestionOption} from './question-option';
import {IStatements} from './statements';
import {ICustomValidation} from './custom-validation';
import {ICrossFieldValidatorPackage} from './cross-field-validator-package';

export interface IQuestion {

  id: string;
  type: string;

  label?: {
    text: string;
    shortText?: string;
    position?: 'before' | 'after';
  };

  hint?: {
    text: string;
    position?: 'before' | 'after';
  };

  placeholder?: string;

  readonly?: boolean;

  isFlag?: boolean;

  validation?: IQuestionValidation;
  customValidation?: ICustomValidation;

  crossFieldValidation: ICrossFieldValidatorPackage[];

  options?: IQuestionOption[];

  shouldAsk?: IStatements;
  retainWhenNotAsked?: boolean;


}
