import {FormControl} from '@angular/forms';
import {Question} from '../forms-config';

export interface IQuestionPackage {
  control: FormControl;
  config: Question;
}
