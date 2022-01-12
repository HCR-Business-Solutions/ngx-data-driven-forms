import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {DataDrivenFormsValidationService} from '../../../ngx-data-driven-forms/src/lib/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  test = {
    id: 'test',
    type: 'owo'
  };

  constructor(
    private fb: FormBuilder,
    private ddFormsValidator: DataDrivenFormsValidationService,
  ) {
    console.log(ddFormsValidator.validateQuestion(this.test));
  }

}
