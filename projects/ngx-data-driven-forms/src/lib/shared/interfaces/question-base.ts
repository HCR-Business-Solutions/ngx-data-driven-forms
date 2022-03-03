import {AbstractControl} from '@angular/forms';
import {Question} from '../form-config';

export interface IQuestionBase {
  control: AbstractControl | null;
  config: Question | null;
  isReadonly: boolean | null;
}
