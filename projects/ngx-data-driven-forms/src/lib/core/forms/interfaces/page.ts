import { IRendererConfig } from './renderer-config';
import { ISection } from './section';
import { IShouldAsk } from './should-ask';

export interface IPage {
  id: string;

  title?: string;
  narrative?: string;

  sections: ISection[];

  shouldAsk?: IShouldAsk;

  rendererConfig?: IRendererConfig;

  customProps?: { [key: string]: any };
}
