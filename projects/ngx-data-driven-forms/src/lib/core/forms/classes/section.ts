import {
  IQuestion,
  IRendererConfig,
  ISection,
  IShouldAsk,
} from '../interfaces';
import { Question } from './question';

export class Section implements ISection {
  id: string;
  title?: string | undefined;
  narrative?: string | undefined;
  questions: { [key: string]: Question };
  layout: string[];
  repeat?:
    | {
        handler: string;
        listRequirements?:
          | { minEntries?: number | undefined; maxEntries?: number | undefined }
          | undefined;
        listArgs?: any[] | undefined;
      }
    | undefined;
  shouldAsk?: IShouldAsk | undefined;
  rendererConfig?: IRendererConfig | undefined;
  customProps?: { [key: string]: any } | undefined;

  constructor(section: ISection) {
    this.id = section.id;
    this.title = section.title;
    this.narrative = section.narrative;
    this.questions = {};
    Object.entries(section.questions).forEach(([key, value]) => {
      this.questions[key] = new Question(value);
    });
    this.layout = section.layout;
    this.repeat = section.repeat;
    this.shouldAsk = section.shouldAsk;
    this.rendererConfig = section.rendererConfig;
    this.customProps = section.customProps;
  }
}
