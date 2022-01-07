import {IQuestionGroup} from './question-group';
import {IStatements} from './statements';

export interface ISection {

  id: string;
  title?: string;
  border?: boolean;

  questions: IQuestionGroup;
  questionOrder: string[];

  repeat?: {
    style: 'list' | 'table';
    itemName?: string;
    minEntries?: number;
    maxEntries?: number;
  };
  shouldAsk?: IStatements;
  retainWhenNotAsked?: boolean;


}
