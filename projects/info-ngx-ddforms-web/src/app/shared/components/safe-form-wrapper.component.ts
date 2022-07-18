import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
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
    this.formValue.emit((this.formControl as FormGroup).getRawValue());
    this.formSubscriber = this.formControl.valueChanges.subscribe(() =>
      this.formValue.emit((this.formControl as FormGroup).getRawValue())
    );
  }

  ngOnDestroy(): void {
    if (this.formSubscriber && !this.formSubscriber.closed) {
      this.formSubscriber.unsubscribe();
    }
  }
}
