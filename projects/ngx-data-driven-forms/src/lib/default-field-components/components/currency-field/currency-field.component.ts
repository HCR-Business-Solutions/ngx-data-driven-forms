import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import { DataDrivenFormsConfigService } from '../../../ddforms/services';
import { Question } from '../../../shared/form-config';
import { IQuestionBase } from '../../../shared/interfaces';
import { generateFieldUUID } from '../../../shared/utilities';


@Component({
  selector: 'ddforms-currency-field',
  templateUrl: './currency-field.component.html',
  styleUrls: ['./currency-field.component.scss']
})
export class CurrencyFieldComponent implements OnInit, IQuestionBase {

  @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;
  @Input() public isReadonly: boolean | null = null;
  public useDefaultStyles = !this.ddFormsConf.getShouldIgnoreStyles();

  public internalId = generateFieldUUID();

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
  ) {
    
  }

  public get formControl(): FormControl {
    return this.control as FormControl;
  }

  ngOnInit(): void {
  }


}
