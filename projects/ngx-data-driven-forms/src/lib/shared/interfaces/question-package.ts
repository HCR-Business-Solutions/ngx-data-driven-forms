import {FormControl} from '@angular/forms';
import {Question} from '../form-config';

export interface IQuestionPackage {
  control: FormControl;
  config: Question;
}
