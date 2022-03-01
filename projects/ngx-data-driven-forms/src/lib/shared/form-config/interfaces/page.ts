import {ISection} from './section';
import {IStatements} from './statements';

export interface IPage {

  id: string;
  navigationName: string;
  title?: string;

  narrative?: {
    text: string;
    style?: 'markdown' | 'plaintext';
  };

  sections: ISection[];

  shouldAsk?: IStatements;
  retainWhenNotAsked?: boolean;


}
