import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Section} from '../../../../shared/form-config';
import { DataDrivenFormsService } from '../../../../ddforms/services';

@Component({
  selector: 'ddforms-section-container',
  templateUrl: './container.component.html',
})
export class SectionContainerComponent implements OnInit, OnDestroy {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  shouldAsk: boolean = true;
  shouldAskSub: Subscription | undefined = undefined;

  constructor(
    private ddForms: DataDrivenFormsService,
  ) {
  }

  public ngOnInit(): void {
    if (this.config && this.control) {
      this.shouldAsk = this.ddForms.shouldAskSection(this.control, this.config);
      this.shouldAskSub = this.ddForms.gatherSectionEvents(this.control, this.config)?.subscribe(() => {
        if (this.config && this.control) {
          this.shouldAsk = this.ddForms.shouldAskSection(this.control, this.config);
        }
      });
    }
  }

  public ngOnDestroy() {

    if (this.shouldAskSub) {
      this.shouldAskSub.unsubscribe();
    }
  }

}
