import {Component} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {DataDrivenFormsService, Question} from '../../../ngx-data-driven-forms/src/lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  test = {
    id: 'test',
    type: 'text',
    label: {
      text: 'Test radio',
    },
    hint: {
      text: 'test hint radio text',
    },
    validation: {
      required: true,
    },
    options: [
      {value: 'test1', display: 'test1'},
      {value: 'test2', display: 'test2'}
    ],
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
