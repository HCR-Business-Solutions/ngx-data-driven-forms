import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RenderFieldBaseComponent } from '../../../../core';

@Component({
  selector: 'ddforms-textarea-field',
  template: `<div class="input-container" *ngIf="this.control && this.question">
    <textarea
      [readonly]="this.isReadonly || this.question.readonly"
      class="form-control control-{{ this.question.type }}"
      [attr.aria-describedby]="
        this.question.hint ? this.fieldId + '-hint' : undefined
      "
      [attr.aria-label]="this.question.ariaLabel"
      [formControl]="this.formControl"
      [id]="this.fieldId"
      [readonly]="this.isReadonly || this.question.readonly"
    >
    </textarea>
  </div>`,
  styles: [],
})
export class TextareaFieldComponent extends RenderFieldBaseComponent {
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
