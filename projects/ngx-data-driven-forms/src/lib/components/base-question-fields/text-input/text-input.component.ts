import {Component, Input, OnInit} from '@angular/core';
import {IQuestionFieldComponent} from '../../_interfaces';
import {FormControl} from '@angular/forms';
import {Question} from '../../../forms-config';
import {DataDrivenFormsConfigService} from '../../../services';

@Component({
  selector: 'ddforms-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit, IQuestionFieldComponent {

  @Input() control!: FormControl | null;
  @Input() config!: Question;

  public readonly useDefaultStyles = !this.ddFormsConf.getShouldIgnoreStyles();

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
  ) {
  }

  ngOnInit(): void {

  }

}
