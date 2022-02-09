import {IPage} from './page';

export interface IApplication {
  id: string;
  description: string;
  pages: IPage[];
}
