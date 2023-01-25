import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RenderFieldBaseComponent } from '../../../../core';

interface Option {
  display: string;
  value: any;
}
@Component({
  selector: 'ddforms-multiselect-field',
  template: `<div class="multiselect-container">
    <div
      class="multiselect-field form-multiselect form-control"
      [id]="this.fieldId"
      [attr.aria-label]="this.question.ariaLabel ?? 'select options'"
      [attr.aria-describedby]="
        this.question.hint ? this.fieldId + '-hint' : undefined
      "
      [ngClass]="this.ngClassValidation"
      (click)="this.optionsExpanded = !this.optionsExpanded"
    >
      <div class="multiselect-text">
        <ng-container
          *ngIf="this.selectedOptions.length >= 1; else noSelected"
          >{{ this.getSelectedDisplay() }}</ng-container
        >
        <ng-template #noSelected>Select an option.</ng-template>
      </div>
    </div>
    <div
      *ngIf="this.optionsExpanded"
      [ariaExpanded]="this.optionsExpanded"
      class="multiselect-options"
    >
      <div
        class="option"
        *ngFor="let option of this.options"
        (click)="this.onOptionInteract(option)"
      >
        <input
          type="checkbox"
          [id]="option.value + 'Checkbox'"
          readonly
          disabled
          [checked]="this.selectedOptions.includes(option.value)"
        />
        <label [for]="option.value + 'Checkbox'">{{ option.display }}</label>
      </div>
    </div>
    <div class="select-icon">&#9013;</div>
  </div>`,
  styles: [
    `
      .multiselect-container {
        position: relative;
        isolation: isolate;
      }
    `,
    `
      .multiselect-field {
        height: 100%;
        cursor: pointer;
        z-index: 10;
      }
    `,
    `
      .select-icon {
        position: absolute;
        right: 4px;
        top: 15%;
        z-index: 20;
        user-select: none;
      }
    `,
    `
      .multiselect-text {
        user-select: none;
      }
    `,
    `
      .multiselect-options {
        display: flex;
        flex-direction: column;
        background: #fefefe;
        border: 0.666667px solid rgb(148, 148, 148);
        border-radius: 4px;
      }
    `,
    `
      .multiselect-options .option {
        cursor: pointer;
        padding: 0.5rem 0.5rem;
      }
    `,
    `
      .multiselect-options .option:hover {
        background: rgba(211, 211, 211, 0.4);
      }
    `,
    `
      .option input {
        margin: 0rem 0.5rem;
      }
    `,
  ],
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

  public optionsExpanded: boolean = false;

  public options: Option[] = [];

  public selectedOptions: any[] = [];

  public optionsSub?: Subscription;

  isFocusInsideComponent = false;
  isComponentClicked = false;

  @HostListener('click')
  clickInside() {
    this.isFocusInsideComponent = true;
    this.isComponentClicked = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.isFocusInsideComponent && this.isComponentClicked) {
      this.optionsExpanded = false;

      this.isComponentClicked = false;
    }
    this.isFocusInsideComponent = false;
  }

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
    this.updateSelected(interact.value);
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
    this.selectedOptions = JSON.parse(this.control.getRawValue() ?? '[]');
  }

  public getDisplayValue(optionValue: any): string {
    const option = this.options.find((option) => option.value === optionValue);
    return option?.display ?? optionValue;
  }

  public getSelectedDisplay(): string {
    const maxDisplay = this.getProp('displayNum') ?? 3;
    if (this.selectedOptions.length > maxDisplay)
      return `${this.selectedOptions.length} Options Selected`;
    const display = this.selectedOptions.slice(0, maxDisplay);
    return display.map((value) => this.getDisplayValue(value)).join(', ');
  }
}
