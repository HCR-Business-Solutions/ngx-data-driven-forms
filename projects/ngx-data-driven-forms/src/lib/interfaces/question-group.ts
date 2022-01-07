import {IQuestion} from './question';

export interface IQuestionGroup {

  [questionId: string]: IQuestion;

}
