import {Question} from './question';
import {IQuestion, IQuestionGroup} from '../interfaces';

export class QuestionGroup implements IQuestionGroup {

  [questionId: string]: Question;

  constructor(questions: IQuestionGroup) {
    Object.entries(questions).forEach(([key, value]: [string, IQuestion]) => {
      this[key] = new Question(value);
    });
  }
}
