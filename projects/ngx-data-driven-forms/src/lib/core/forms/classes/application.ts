import { IApplication, IRendererConfig } from '../interfaces';
import { Page } from './page';

export class Application implements IApplication {
  id: string;
  description: string;
  pages: Page[];
  rendererConfig?: IRendererConfig | undefined;
  customProps?: { [key: string]: any } | undefined;

  constructor(application: IApplication) {
    this.id = application.id;
    this.description = application.description;
    this.pages = application.pages.map((_) => new Page(_));
    this.rendererConfig = application.rendererConfig;
    this.customProps = application.customProps;
  }
}
