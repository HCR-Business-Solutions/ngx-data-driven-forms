import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RenderFieldBaseComponent } from '../../../../core';

interface Option {
  display: string;
  value: any;
}
@Component({
  selector: 'ddforms-multi-select-field',
  template: ` <p>multi-select-field works!</p> `,
  styles: [],
})
export class MultiSelectFieldComponent
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

  public options: Option[] = [];

  public selectedOptions: any[] = [];

  public optionsSub?: Subscription;

  constructor(private httpClient: HttpClient) {
    super();
  }

  public ngOnInit(): void {
    this.getOptions();
    this.decodeSelected();
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

    const httpStr = this.getProp('src');
    if (httpStr) {
      this.clearOptionsSub();
      this.optionsSub = this.httpClient
        .get<Option[]>(httpStr)
        .subscribe((response: Option[]) => (this.options = response));
      return;
    }

    this.options = [];
  }

  public getProp(key: string): any {
    if (!this.question?.customProps) return null;
    return this.question?.customProps[key] ?? null;
  }

  get formControl(): UntypedFormControl {
    return this.control as UntypedFormControl;
  }

  public onOptionInteract(interact: Option): void {
    this.updateSelected(interact);
    this.encodeSelected();
  }

  public updateSelected(nextValue: any): void {
    const OPTION_INDEX = this.selectedOptions.findIndex(
      (option) => option === nextValue
    );
    const OPTION_CURRENTLY_SELECTED = OPTION_INDEX >= 0;

    if (OPTION_CURRENTLY_SELECTED) {
      this.selectedOptions = [
        ...this.selectedOptions.slice(0, OPTION_INDEX),
        ...this.selectedOptions.slice(OPTION_INDEX + 1),
      ];
    } else {
      this.selectedOptions = [...this.selectedOptions, nextValue];
    }
  }

  public encodeSelected(): void {
    this.control.setValue(JSON.stringify(this.selectedOptions));
  }

  public decodeSelected(): void {
    this.selectedOptions = JSON.parse(this.control.getRawValue() ?? []);
  }

  public getDisplayValue(optionValue: any): string {
    const option = this.options.find((option) => option.value === optionValue);
    return option?.display ?? optionValue;
  }
}
