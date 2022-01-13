import {Component} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {
  DataDrivenFormsService,
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
    type: 'number',
    label: {
      text: 'Test Input'
    },
    hint: {
      text: 'test hint text',
    },
    validation: {
      required: true,
    }
  };

  config: Question;
  control: FormControl;

  constructor(
    private fb: FormBuilder,
    private ddForms: DataDrivenFormsService,
  ) {
    this.config = this.ddForms.generateQuestionConfig(this.test);
    this.control = this.ddForms.generateQuestionControl(null, this.config, true);
    console.log('control', this.control);
  }

  onLogButton(){
    console.log('control', this.control);
  }

}
