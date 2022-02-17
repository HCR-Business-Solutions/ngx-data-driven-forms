import {ISection} from './section';
import {IStatements} from './statements';

export interface IPage {

  id: string;
  navigationName: string;
  title?: string;

  narrative?: string;

  sections: ISection[];

  shouldAsk?: IStatements;
  retainWhenNotAsked?: boolean;


}
