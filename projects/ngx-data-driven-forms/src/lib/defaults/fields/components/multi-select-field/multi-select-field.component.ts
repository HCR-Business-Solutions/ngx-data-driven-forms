import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RenderFieldBaseComponent } from '../../../../core';

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

    const httpStr = this.getProp('src');
    if (httpStr) {
      this.clearOptionsSub();
      this.optionsSub = this.httpClient
        .get<{ display: string; value: any }[]>(httpStr)
        .subscribe(
          (response: { display: string; value: any }[]) =>
            (this.options = response)
        );
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
}
