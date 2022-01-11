import {Component, Input, OnInit} from '@angular/core';
import {IQuestionFieldComponent} from '../../_interfaces';
import {AbstractControl} from '@angular/forms';
import {Question} from '../../../forms-config';

@Component({
  selector: 'ddforms-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit, IQuestionFieldComponent {

  @Input() control?: AbstractControl | null;
  @Input() config?: Question;

  constructor() {
  }

  ngOnInit(): void {
  }

}
