import {FormControl} from '@angular/forms';
import {Question} from '../classes';

export interface IQuestionPackage {
  control: FormControl;
  config: Question;
}
