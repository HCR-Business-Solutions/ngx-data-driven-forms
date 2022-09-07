import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RenderFieldBaseComponent } from '../../../../core';

@Component({
  selector: 'ddforms-generic-text-based-field',
  template: `<div class="input-container" *ngIf="this.control && this.question">
    <input
      [type]="this.question.type"
      [ngClass]="this.ngClassValidation"
      class="form-control control-{{ this.question.type }}"
      [attr.aria-describedby]="
        this.question.hint ? this.fieldId + '-hint' : undefined
      "
      [attr.aria-label]="this.question.ariaLabel"
      [formControl]="this.formControl"
      [id]="this.fieldId"
      [readonly]="this.isReadonly || this.question.readonly"
      [attr.inputmode]="this.question.inputMode ?? 'text'"
    />
  </div>`,
  styles: [],
})
export class GenericTextBasedFieldComponent extends RenderFieldBaseComponent {
  public readonly ngClassValidation = {
    'is-invalid':
      !this.getProp('disableInvalidClass') &&
      this.control?.errors &&
      (this.control?.touched || this.control?.dirty),
    'is-valid':
      !this.getProp('disableValidClass') &&
      this.control?.valid &&
      (this.control?.touched || this.control?.dirty),
  };

  constructor() {
    super();
  }

  public getProp(key: string): any {
    if (!this.question?.customProps) return null;
    return this.question?.customProps[key] ?? null;
  }

  get formControl(): FormControl {
    return this.control as FormControl;
  }
}
