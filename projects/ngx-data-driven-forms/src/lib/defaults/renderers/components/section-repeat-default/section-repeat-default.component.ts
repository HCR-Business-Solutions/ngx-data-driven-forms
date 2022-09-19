import { ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormArray } from '@angular/forms';
import {
  MasterReigistryService,
  RenderSectionRepeatBaseComponent,
} from '../../../../core';

@Component({
  selector: 'ddforms-section-repeat-default',
  template: `<div class="section-repeat-container">
    <ng-container ddFormsRenderHeading></ng-container>
    <ng-container ddFormsRenderNarrative></ng-container>
    <ng-container ddFormsRenderError></ng-container>
    <div class="repeat-input-container">
      <div class="repeat-input-text-container">
        {{this.section.repeat?.addText ?? 'Add an entry'}}
      </div>
      <ng-container ddFormsRenderRepeatInput></ng-container>
      <div class="repeat-input-actions-container">
        <button
          class="button cancel-button"
          (click)="this.cancelEdit()"
          *ngIf="this.editId !== null"
          type="button"
        >
          Cancel
        </button>
        <button
          class="button clear-button"
          (click)="this.clearInput()"
          *ngIf="this.editId === null"
          type="button"
        >
          Clear
        </button>
        <button
          class="add-button"
          (click)="this.addEntry()"
          *ngIf="this.editId === null"
          type="button"
        >
          Add
        </button>
        <button
          class="edit-button"
          (click)="this.editEntry()"
          *ngIf="this.editId !== null"
          type="button"
        >
          Edit
        </button>
      </div>
    </div>
    <ng-container ddFormsRenderRepeatData></ng-container>
  </div>`,
  styles: [],
})
export class SectionRepeatDefaultComponent extends RenderSectionRepeatBaseComponent {
  editId: number | null = null;

  constructor(
    protected masterRegistry: MasterReigistryService,
    protected cdr: ChangeDetectorRef
  ) {
    super(masterRegistry, cdr);
  }

  // addEntry takes the value from input form and adds it to control if it has a value and is valid
  addEntry() {
    if (!this.inputForm) return;
    if (this.inputForm.value && this.inputForm.valid && this.inputForm.dirty) {
      const temp = this.section.asForm(
        this.inputForm.value,
        this.masterRegistry._fieldValidatorRegistry.getRegistry(),
        this.masterRegistry._crossFieldValidatorRegistry.getRegistry(),
        true
      );
      (this.control as UntypedFormArray).push(temp);
      this.inputForm.reset();
    } else {
      this.inputForm.markAsDirty({ onlySelf: false });
    }
  }

  // editEntry takes the value from input form and replaces the value at the editId index in control if it has a value and is valid
  editEntry() {
    if (!this.inputForm || this.editId === null) return;
    if (this.inputForm.value && this.inputForm.valid) {
      (this.control as UntypedFormArray)
        .at(this.editId)
        .patchValue(this.inputForm.value);
      this.inputForm.reset();
      this.editId = null;
    }
  }

  // cancelEdit resets the input form and sets editId to null
  cancelEdit() {
    if (!this.inputForm) return;
    this.inputForm.reset();
    this.editId = null;
  }

  // clearInput resets the input form
  clearInput() {
    if (!this.inputForm) return;
    this.inputForm.reset();
  }
}
