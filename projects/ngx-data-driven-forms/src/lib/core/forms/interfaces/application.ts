import { IPage } from './page';
import { IRendererConfig } from './renderer-config';

export interface IApplication {
  id: string;
  description: string;
  pages: IPage[];
  rendererConfig?: IRendererConfig;
  customProps?: { [key: string]: any };
}
