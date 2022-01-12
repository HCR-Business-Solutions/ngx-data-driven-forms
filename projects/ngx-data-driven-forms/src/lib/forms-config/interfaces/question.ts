import {IQuestionValidation} from './question-validation';
import {IQuestionOption} from './question-option';
import {IStatements} from './statements';
import {ICustomValidation} from './custom-validation';

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
  options?: IQuestionOption[];

  shouldAsk?: IStatements;
  retainWhenNotAsked?: boolean;


}
