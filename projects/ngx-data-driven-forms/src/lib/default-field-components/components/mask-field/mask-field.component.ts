import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {DataDrivenFormsConfigService} from '../../../ddforms/services';
import {Question} from '../../../shared/form-config/classes';
import {IQuestionBase} from '../../../shared/interfaces';
import {IMaskConfig} from '../../field-configs';

@Component({
  selector: 'ddforms-mask-field',
  templateUrl: './mask-field.component.html',
  styleUrls: [
    './mask-field.component.scss'
  ]
})
export class MaskFieldComponent implements OnInit, IQuestionBase {

  @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;
  @Input() public isReadonly: boolean | null = null;
  public useDefaultStyles: boolean = true;

  public internalId = !this.ddFormsConf.getShouldIgnoreStyles();

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
  ) {
  }

  public get formControl(): FormControl {
    return this.control as FormControl;
  }

  ngOnInit(): void {
  }

  public get mask(): string {
    const maskConfig: IMaskConfig | undefined = this.config?.fieldConfig ? (this.config?.fieldConfig as IMaskConfig) : undefined;
    if (maskConfig === undefined) return '';
    if ('mask' in maskConfig) {
      return maskConfig.mask ?? '';
    }
    return '';
  }

}
