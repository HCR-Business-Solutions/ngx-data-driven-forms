import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {DataDrivenFormsConfigService, OptionsDataService} from '../../../ddforms/services';
import { IQuestionOption, Question } from '../../../shared/form-config';
import { IQuestionBase } from '../../../shared/interfaces';
import { generateFieldUUID } from '../../../shared/utilities';
import { IOptionsConfig } from '../../field-configs';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';



@Component({
  selector: 'ddforms-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss']
})
export class RadioFieldComponent implements OnInit, OnDestroy, IQuestionBase {

  @Input() public config: Question | null = null;
  @Input() public control: AbstractControl | null = null;
  @Input() public isReadonly: boolean | null = null;
  public useDefaultStyles = !this.ddFormsConf.getShouldIgnoreStyles();

  public internalId = generateFieldUUID();

  public options: IQuestionOption[] = [];
  public subs: Subscription[] = [];

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
    private http: HttpClient,
    private optionsData: OptionsDataService,
  ) {

  }

  public get formControl(): FormControl {
    return this.control as FormControl;
  }

  public ngOnInit(): void {
    this.setupOptions();
  }

  public ngOnDestroy(): void {
    this.subs.forEach(_ => {
      if (_ && !_.closed) {
        _.unsubscribe();
      }
    })
  }

  setupOptions(): void {
    const options: IOptionsConfig | undefined = this.config?.fieldConfig ? (this.config?.fieldConfig as IOptionsConfig) : undefined;
    if(options === undefined) return;

    if ('options' in options) {
      this.options = options.options
    } else if ('apiSourceString' in options) {
      this.subs.push(this.http.get(options.apiSourceString).subscribe(result => this.options = result as IQuestionOption[]));
    } else if ('dataSourceRef' in options) {
      this.subs.push(this.optionsData.getKeyStream(options.dataSourceRef).subscribe(result => this.options = result ?? []));
    }
  }

}
