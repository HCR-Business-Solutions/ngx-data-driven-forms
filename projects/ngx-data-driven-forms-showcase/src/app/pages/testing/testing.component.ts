import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {DataDrivenFormsService, Question} from '../../../../../ngx-data-driven-forms/src/lib';

@Component({
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {

  test = {
    id: 'test',
    type: 'currency',
    label: {
      text: 'Test test',
    },
    hint: {
      text: '',
    },
    validation: {
      required: true,
    },
    // options: [
    //   {value: 'test1', display: 'test1'},
    //   {value: 'test2', display: 'test2'}
    // ],
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

  ngOnInit(): void {
  }

}
