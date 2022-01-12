import {Component} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {
  DataDrivenFormsConfigService,
  DataDrivenFormsValidationService,
  IQuestion,
  Question
} from '../../../ngx-data-driven-forms/src/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  test = {
    id: 'test',
    type: 'test',
    label: {
      text: 'Test Input'
    }
  };

  configInterface: IQuestion;
  config: Question;
  control: FormControl;

  constructor(
    private fb: FormBuilder,
    private ddFormsConf: DataDrivenFormsConfigService,
    private ddFormsValidator: DataDrivenFormsValidationService,
  ) {
    this.configInterface = this.test;
    this.config = new Question(this.configInterface);
    this.control = this.config.control(null, this.fb);
    console.log('ddFormsValidation', ddFormsValidator.validateQuestion(this.test));
  }

}
