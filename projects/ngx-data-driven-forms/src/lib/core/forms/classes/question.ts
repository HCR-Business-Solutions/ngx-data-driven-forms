import { IQuestion, IQuestionAccessible } from '../interfaces';

type QuestionImplementation = IQuestion | IQuestionAccessible;

export class Question implements QuestionImplementation {}
