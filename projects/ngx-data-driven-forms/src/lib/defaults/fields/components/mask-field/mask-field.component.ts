import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { RenderFieldBaseComponent } from '../../../../core';
import { MaskProps } from '../../interfaces';

@Component({
  selector: 'ddforms-mask-field',
  template: `<div
    class="mask-input-container"
    *ngIf="this.control && this.question"
  >
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
      [mask]="this.maskConfig.mask"
      [prefix]="this.maskConfig.prefix"
      [suffix]="this.maskConfig.suffix"
      [dropSpecialCharacters]="this.maskConfig.dropSpecialCharacters"
      [showMaskTyped]="this.maskConfig.showMaskTyped"
      [placeHolderCharacter]="this.maskConfig.placeHolderCharacter"
      [clearIfNotMatch]="this.maskConfig.clearIfNotMatch"
      [allowNegativeNumbers]="this.maskConfig.allowNegativeNumbers"
      [thousandSeparator]="this.maskConfig.thousandSeparator"
      [leadZeroDateTime]="this.maskConfig.leadZeroDateTime"
      [validation]="this.maskConfig.validation"
      [hiddenInput]="this.maskConfig.hiddenInput"
    />
  </div>`,
  styles: [],
})
export class MaskFieldComponent extends RenderFieldBaseComponent {
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

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }

  get maskConfig(): MaskProps {
    return {
      mask: this.getProp('mask') ?? '',
      prefix: this.getProp('prefix') ?? '',
      suffix: this.getProp('suffix') ?? '',
      dropSpecialCharacters: this.getProp('dropSpecialCharacers') ?? true,
      showMaskTyped: this.getProp('showMaskTyped') ?? false,
      placeHolderCharacter: this.getProp('placeHolderCharacter') ?? '_',
      clearIfNotMatch: this.getProp('clearIfNotMatch') ?? false,
      allowNegativeNumbers: this.getProp('allowNegativeNumbers') ?? false,
      thousandSeparator: this.getProp('thousandSeparator') ?? ' ',
      leadZeroDateTime: this.getProp('leadZeroDateTime') ?? false,
      validation: this.getProp('validation') ?? true,
      hiddenInput: this.getProp('hiddenInput') ?? false,
    };
  }
}
