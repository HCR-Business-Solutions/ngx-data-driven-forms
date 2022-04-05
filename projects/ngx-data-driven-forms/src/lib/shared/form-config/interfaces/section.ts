import {IQuestionGroup} from './question-group';
import {IStatements} from './statements';

export interface ISection {

  id: string;
  title?: string;
  border?: boolean;

  narrative?: {
    text: string;
    style?: 'markdown' | 'plaintext';
  };

  questions: IQuestionGroup;
  questionOrder: string[];

  repeat?: {
    style: 'list' | 'table';
    itemName: string;
    inputStyle?: string;    
    minEntries?: number;
    maxEntries?: number;
  };
  shouldAsk?: IStatements;
  retainWhenNotAsked?: boolean;


}
