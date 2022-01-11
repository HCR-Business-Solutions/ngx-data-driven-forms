import {AbstractControl} from '@angular/forms';
import {Question} from '../../forms-config';

export interface IQuestionFieldComponent {
  control?: AbstractControl | null;
  config?: Question | null;
}
