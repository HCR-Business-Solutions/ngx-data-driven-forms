import {ISection} from './section';
import {IStatements} from './statements';

export interface IPage {

  id: string;
  pageTitle?: string;

  sections: ISection[];

  shouldAsk?: IStatements;
  retainWhenNotAsked?: boolean;


}
