import { IRendererConfig } from './renderer-config';
import { IQuestion, IQuestionAccessible } from './question';
import { IShouldAsk } from './should-ask';

interface ISectionBase {
  id: string;

  title?: string;

  narrative?: string;

  layout: (string | string[])[];

  repeat?: {
    handler: string;
    listRequirements?: {
      minEntries?: number;
      maxEntries?: number;
    };
    listArgs?: any[];
  };

  shouldAsk?: IShouldAsk;

  rendererConfig?: IRendererConfig;

  customProps?: { [key: string]: any };
}

interface ISectionExtension {
  questions: { [key: string]: IQuestion };
}

interface ISectionExtensionAccessible {
  questions: { [key: string]: IQuestionAccessible };
}

export type ISection = ISectionBase & ISectionExtension;
export type ISectionAccessible = ISectionBase & ISectionExtensionAccessible;
