import {Component, Input, OnInit} from '@angular/core';
import {IQuestionFieldComponent} from '../../_interfaces';
import {AbstractControl, FormControl} from '@angular/forms';
import {Question} from '../../../forms-config';

@Component({
  selector: 'ddforms-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css']
})
export class TextFieldComponent implements OnInit, IQuestionFieldComponent {

  @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;

  constructor() {
  }

  public get formControl(): FormControl {
    return this.control as FormControl;
  }

  ngOnInit(): void {
  }


}
