import {IStatement} from './statement';

export interface IStatements {
  statements: IStatement[];
  check?: 'one' | 'all';
}
