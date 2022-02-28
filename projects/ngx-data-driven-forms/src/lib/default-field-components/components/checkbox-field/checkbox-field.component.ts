import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import { DataDrivenFormsConfigService } from '../../../ddforms/services';
import { IQuestionOption, Question } from '../../../shared/form-config';
import { IQuestionBase } from '../../../shared/interfaces';
import { generateFieldUUID } from '../../../shared/utilities';
import { IOptionsConfig } from '../../field-configs';

@Component({
  selector: 'ddforms-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss']
})
export class CheckboxFieldComponent implements OnInit, IQuestionBase {

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



  get options(): IQuestionOption[] {
    const options: IOptionsConfig | undefined = this.config?.fieldConfig ? (this.config?.fieldConfig as IOptionsConfig) : undefined;
    if(options === undefined) return [];

    if ('options' in options) {
      return options.options
    } else if ('apiSourceString' in options) {
      return []; // TODO: Hook up to api?
    }

    return [];
  }



}
