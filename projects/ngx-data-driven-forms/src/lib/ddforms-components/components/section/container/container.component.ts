import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Section } from '../../../../shared/form-config';
import {
  DataDrivenFormsConfigService,
  DataDrivenFormsService,
} from '../../../../ddforms/services';

@Component({
  selector: 'ddforms-section-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class SectionContainerComponent implements OnInit, OnDestroy {
  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  shouldAsk: boolean = true;
  shouldAskSub: Subscription | undefined = undefined;

  addControl: FormGroup | null = null;

  public useDefaultStyles: boolean = !this.ddFormsConf.getShouldIgnoreStyles();

  constructor(
    private ddForms: DataDrivenFormsService,
    private ddFormsConf: DataDrivenFormsConfigService
  ) {}

  public ngOnInit(): void {
    if (this.config && this.control) {
      this.addControl = this.ddForms.generateSectionGroup(null, this.config);
      this.shouldAsk = this.ddForms.shouldAskSection(this.control, this.config);
      this.shouldAskSub = this.ddForms
        .gatherSectionEvents(this.control, this.config)
        ?.subscribe(() => {
          if (this.config && this.control) {
            this.shouldAsk = this.ddForms.shouldAskSection(
              this.control,
              this.config
            );
          }
        });
    }
  }

  public ngOnDestroy() {
    if (this.shouldAskSub) {
      this.shouldAskSub.unsubscribe();
    }
  }

  public handleClear() {
    this.addControl?.reset();
  }

  public handleAdd() {
    if (!this.addControl || !this.config || !this.control) return;
    if (this.addControl.invalid) {
      this.addControl.markAllAsTouched();
      return;
    }

    const newControl = this.ddForms.generateSectionGroup(
      this.addControl.getRawValue(),
      this.config
    );
    (this.control as FormArray).push(newControl);
    this.addControl.reset();
  }

  handleEdit(control: AbstractControl, index: number) {
    if (!this.addControl || !this.config || !this.control) return;
    this.addControl.setValue((control as FormGroup).getRawValue());
    (this.control as FormArray).removeAt(index);
  }

  handleDelete(index: number) {
    (this.control as FormArray).removeAt(index);
  }
}
