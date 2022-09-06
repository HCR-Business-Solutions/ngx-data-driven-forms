import { IRendererConfig } from './renderer-config';
import { IQuestion } from './question';
import { IShouldAsk } from './should-ask';

export interface ISection {
  id: string;

  title?: string;

  narrative?: string;

  questions: { [key: string]: IQuestion };
  layout: string[];

  repeat?: {
    handler: string;
    min?: number;
    max?: number;
    addText?: string;
    itemHeader?: string;
    listArgs?: any[];
  };

  shouldAsk?: IShouldAsk;

  rendererConfig?: IRendererConfig;

  customProps?: { [key: string]: any };
}
