import { IRendererConfig } from './renderer-config';
import { ISection, ISectionAccessible } from './section';
import { IShouldAsk } from './should-ask';

interface IPageBase {
  id: string;

  title?: string;
  narrative?: string;

  shouldAsk?: IShouldAsk;

  rendererConfig?: IRendererConfig;

  customProps?: { [key: string]: any };
}

interface IPageExtension {
  sections: ISection[];
}

interface IPageExtensionAccessible {
  sections: ISectionAccessible[];
}
