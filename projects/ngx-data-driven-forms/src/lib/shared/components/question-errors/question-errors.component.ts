import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import { DataDrivenFormsConfigService } from '../../../ddforms/services';
import { Question } from '../../form-config';

@Component({
  selector: 'ddforms-question-errors',
  templateUrl: './question-errors.component.html',
  styleUrls: ['./question-errors.component.scss']
})
export class QuestionErrorsComponent implements OnInit {

  @Input() public control: AbstractControl | null = null;
  @Input() public config: Question | null = null;

  public useStyles: boolean = false;

  // private ddFormsConf?: DataDrivenFormsConfigService;

  constructor(
    // private injector: Injector,
    private ddFormsConf: DataDrivenFormsConfigService,
  ) {
    // setTimeout(() => {
    // this.ddFormsConf = injector.get(DataDrivenFormsConfigService);
    // })
  }

  ngOnInit(): void {
      this.useStyles = !this.ddFormsConf?.getShouldIgnoreStyles();
  }

  decodeErrorMessages(errors: {[key: string]: any}): string[] {

    if(!errors) return [];

    const messages: string[] = [];
    const knownMessageHandlers = this.ddFormsConf?.getErrorMessageHandlers();

    Object.entries(errors).forEach(([key, errorObj]: [string, any]) => {
      let tempMessage = key;
      let errorHandler = knownMessageHandlers?.get(key);
      if (errorHandler) {
        tempMessage = errorHandler(errorObj);
      }
      messages.push(tempMessage);
    });

    return messages;

  }

}
