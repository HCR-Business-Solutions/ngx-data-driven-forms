import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { IQuestionFieldComponent } from '../..';
import { DataDrivenFormsConfigService, Question } from '../../..';

@Component({
  selector: 'ddforms-question-errors',
  templateUrl: './question-errors.component.html',
  styleUrls: ['./question-errors.component.scss']
})
export class QuestionErrorsComponent implements OnInit, IQuestionFieldComponent {

  @Input() public control: AbstractControl | null = null;
  @Input() public config: Question | null = null;

  public useStyles: boolean = false;

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService,
  ) {
    this.useStyles = !this.ddFormsConf.getShouldIgnoreStyles();
  }

  ngOnInit(): void {
  }

  decodeErrorMessages(errors: {[key: string]: any}): string[] {

    if(!errors) return [];

    const messages: string[] = [];
    const knownMessageHandlers = this.ddFormsConf.getErrorMessageHandlers();

    Object.entries(errors).forEach(([key, errorObj]: [string, any]) => {
      let tempMessage = key;
      let errorHandler = knownMessageHandlers.get(key);
      if (errorHandler) {
        tempMessage = errorHandler(errorObj);
      }
      messages.push(tempMessage);
    });

    return messages;

  }

}
