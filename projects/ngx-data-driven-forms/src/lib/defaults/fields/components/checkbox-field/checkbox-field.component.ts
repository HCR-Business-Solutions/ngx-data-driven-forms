import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RenderFieldBaseComponent } from '../../../../core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ddforms-checkbox-field',
  template: ` <ng-container *ngIf="this.control && this.question">
    <div
      class="checkbox-container checkbox-field form-check"
      *ngFor="let option of this.options"
    >
      <label [for]="this.getOptionId(option)" class="form-check-label">
        <input
          type="checkbox"
          [ngClass]="this.ngClassValidation"
          class="form-control control-{{ this.question.type }} form-check-input"
          [attr.aria-describedby]="
            this.question.hint ? this.fieldId + '-hint' : undefined
          "
          [formControl]="this.formControl"
          [id]="this.getOptionId(option)"
          [readonly]="this.isReadonly || this.question.readonly"
          [attr.inputmode]="this.question.inputMode ?? 'text'"
          [value]="option.value"
        />
        <markdown
          [data]="this.option.display"
          class="check-input-text"
        ></markdown>
      </label>
    </div>
  </ng-container>`,
  styles: [],
})
export class CheckboxFieldComponent
  extends RenderFieldBaseComponent
  implements OnInit, OnDestroy
{
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

  public options: {
    display: string;
    value: any;
  }[] = [];

  public optionsSub?: Subscription;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public ngOnInit(): void {
    this.getOptions();
  }

  public ngOnDestroy(): void {
    this.clearOptionsSub();
  }

  private clearOptionsSub(): void {
    if (this.optionsSub && !this.optionsSub?.closed) {
      this.optionsSub.unsubscribe();
    }
  }

  private getOptions(): void {
    const options = this.getProp('options');
    if (options) {
      this.options = options;
      return;
    }

    const httpStr = this.getProp('options');
    if (httpStr) {
      this.clearOptionsSub();
      this.optionsSub = this.httpClient
        .get<{ display: string; value: any }[]>(httpStr)
        .subscribe((response) => (this.options = response));
      return;
    }

    this.options = [];
  }

  public getProp(key: string): any {
    if (!this.question?.customProps) return null;
    return this.question?.customProps[key] ?? null;
  }

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  public getOptionId(option: { display: string; value: any }): string {
    return `${this.fieldId}-option-${option.value}`;
  }
}
