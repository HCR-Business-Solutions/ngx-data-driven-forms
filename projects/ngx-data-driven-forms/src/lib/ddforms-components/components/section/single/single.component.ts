import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Section } from '../../../../shared/form-config';
import { IQuestionPackage } from '../../../../shared/interfaces';
import {
  DataDrivenFormsConfigService,
  DataDrivenFormsService,
} from '../../../../ddforms/services';
import { getQuestionControlPair } from '../../../../shared/utilities';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  animateChild,
} from '@angular/animations';

@Component({
  selector: 'ddforms-section-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SectionSingleComponent implements OnInit {
  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() isReadonly: boolean = false;
  @Input() showHideDetails: boolean = false;

  questions: IQuestionPackage[] = [];

  public useDefaultStyles = !this.ddFormsConf.getShouldIgnoreStyles();

  constructor(
    private ddForms: DataDrivenFormsService,
    private ddFormsConf: DataDrivenFormsConfigService
  ) {}

  ngOnInit(): void {
    if (this.config && this.control) {
      this.questions = getQuestionControlPair(
        this.config.questions,
        this.control,
        this.config.questionOrder
      );
    }
  }
}
