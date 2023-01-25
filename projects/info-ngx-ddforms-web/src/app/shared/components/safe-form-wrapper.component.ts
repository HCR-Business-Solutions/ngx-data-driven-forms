import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import {
  Application,
  FormGenerationService,
} from 'ngx-data-driven-forms/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-safe-form-wrapper',
  template: `
    <ng-container *ngIf="this.form && this.formControl">
      <ddforms-application-container
        [application]="this.form"
        [control]="this.formControl"
        [currentPageIndex]="this.pageIndex"
        class="w-full py-4"
      ></ddforms-application-container>
      <button
        class="w-full border border-orange-800 bg-orange-50 text-xl font-semibold py-4 my-2 rounded-sm"
        (click)="onFakeSubmit()"
      >
        "Submit"
      </button>
    </ng-container>
  `,
  styles: [],
})
export class SafeFormWrapperComponent implements OnInit, OnDestroy {
  @Input() form!: Application;
  @Input() pageIndex: number = 0;
  formControl!: AbstractControl;

  @Output() formValue = new EventEmitter<any | null>();

  private formSubscriber?: Subscription;

  constructor(private ddFormsGenerator: FormGenerationService) {}

  ngOnInit(): void {
    this.formControl = this.ddFormsGenerator.buildApplicationControl(
      null,
      this.form
    );
    this.formValue.emit((this.formControl as UntypedFormGroup).getRawValue());
    this.formSubscriber = this.formControl.valueChanges.subscribe(() =>
      this.formValue.emit((this.formControl as UntypedFormGroup).getRawValue())
    );
  }

  ngOnDestroy(): void {
    if (this.formSubscriber && !this.formSubscriber.closed) {
      this.formSubscriber.unsubscribe();
    }
  }

  onFakeSubmit(): void {
    if (this.formControl.invalid) {
      this.formControl.markAllAsTouched();
    }
    console.log({ control: this.formControl });
  }
}
