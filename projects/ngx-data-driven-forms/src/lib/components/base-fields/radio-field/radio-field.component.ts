import {Component, Input, OnInit} from '@angular/core';
import {IQuestionFieldComponent} from '../../../_interfaces';
import {AbstractControl, FormControl} from '@angular/forms';
import {Question} from '../../../forms-config';
import {DataDrivenFormsConfigService} from '../../../services';
import {generateFieldUUID} from '../../../utils';


@Component({
  selector: 'ddforms-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss']
})
export class RadioFieldComponent implements OnInit, IQuestionFieldComponent {

  @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;
  public useStyles: boolean = true;

  public internalId = generateFieldUUID();

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
