import { IPage, IRendererConfig, IShouldAsk } from '../interfaces';
import { Section } from './section';

export class Page implements IPage {
  id: string;
  title?: string | undefined;
  narrative?: string | undefined;
  sections: Section[];
  shouldAsk?: IShouldAsk | undefined;
  rendererConfig?: IRendererConfig | undefined;
  customProps?: { [key: string]: any } | undefined;

  constructor(page: IPage) {
    this.id = page.id;
    this.title = page.title;
    this.narrative = page.narrative;
    this.sections = page.sections.map((_) => new Section(_));
    this.shouldAsk = page.shouldAsk;
    this.rendererConfig = page.rendererConfig;
    this.customProps = page.customProps;
  }
}
