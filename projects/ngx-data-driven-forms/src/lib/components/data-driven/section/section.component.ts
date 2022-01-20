import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Section} from '../../../forms-config';
import {AbstractControl} from '@angular/forms';
import {config, Subscription} from 'rxjs';
import {DataDrivenFormsConfigService, DataDrivenFormsService} from '../../../services';
import {DynamicFormsUtils, IQuestionPackage} from '../../../utils';

@Component({
  selector: 'ddforms-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit, OnDestroy {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  shouldAsk: boolean = true;
  shouldAskSub: Subscription | undefined = undefined;

  constructor(
    private ddForms: DataDrivenFormsService,
  ) { }

  public ngOnInit(): void {
    if (this.config && this.control) {
      this.shouldAsk = this.ddForms.shouldAskSection(this.control, this.config);
      this.shouldAskSub = this.ddForms.gatherSectionEvents(this.control, this.config)?.subscribe(() => {
        if (this.config && this.control) {
          this.shouldAsk = this.ddForms.shouldAskSection(this.control, this.config);
        }
      })
    }
  }

  public ngOnDestroy() {

    if (this.shouldAskSub) {
      this.shouldAskSub.unsubscribe();
    }
  }

}
