import {Component, Input, OnInit} from '@angular/core';
import {IQuestionFieldComponent} from '../../_interfaces';
import {AbstractControl, FormControl} from '@angular/forms';
import {Question} from '../../../forms-config';
import { DataDrivenFormsConfigService } from '../../..';

@Component({
  selector: 'ddforms-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit, IQuestionFieldComponent {

  @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;
  public useStyles: boolean = true;

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
  ) {
    this.useStyles = !this.ddFormsConf.getShouldIgnoreStyles();
  }

  public get formControl(): FormControl {
    return this.control as FormControl;
  }

  ngOnInit(): void {
  }


}
