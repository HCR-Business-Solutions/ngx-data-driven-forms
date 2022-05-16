import { IApplication } from '../interfaces';
import { Page } from './page';

export class Application implements IApplication {
  id: string;
  description: string;
  pages: Page[];

  constructor(application: IApplication) {
    this.id = application.id;
    this.description = application.description;
    this.pages = application.pages.map((_) => new Page(_));
  }
}
