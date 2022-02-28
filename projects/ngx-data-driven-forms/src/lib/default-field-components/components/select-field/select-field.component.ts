import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import { DataDrivenFormsConfigService } from '../../../ddforms/services';
import { IQuestionOption, Question } from '../../../shared/form-config';
import { IQuestionBase } from '../../../shared/interfaces';
import { generateFieldUUID } from '../../../shared/utilities';
import { IOptionsConfig } from '../../field-configs';


@Component({
  selector: 'ddforms-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent implements OnInit, IQuestionBase {

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
      return options.options;
    } else if ('apiSourceString' in options) {
      return []; // TODO: Hook up to api httpClient
    } else if ('dataSourceRef' in options) {
      return [];
    }

    return [];
  }

}
