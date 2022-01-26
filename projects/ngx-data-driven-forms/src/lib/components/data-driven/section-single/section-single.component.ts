import {Component, Input, OnInit} from '@angular/core';
import {DynamicFormsUtils, IQuestionPackage} from '../../../utils';
import {Question, Section} from '../../../forms-config';
import {AbstractControl} from '@angular/forms';
import {DataDrivenFormsService} from '../../../services';

@Component({
  selector: 'ddforms-section-single',
  templateUrl: './section-single.component.html',
  styleUrls: ['./section-single.component.scss']
})
export class SectionSingleComponent implements OnInit {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;
  questions: IQuestionPackage[] = [];

  constructor(
    private ddForms: DataDrivenFormsService
  ) {
  }

  ngOnInit(): void {
    if (this.config && this.control) {
      this.questions = DynamicFormsUtils.getQuestionControlPair(this.config.questions, this.control, this.config.questionOrder);
    }
  }
}
