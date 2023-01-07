import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, FormControl } from '@angular/forms';
import { RenderRepeatDataBaseComponent, Section } from '../../../../core';

@Component({
  selector: 'ddforms-repeat-data-default',
  template: `<div
    class="repeat-data-container {{ this.section.id }}-data {{ this.classes }}"
    *ngIf="this.section && this.itemSection"
  >
    <div
      *ngFor="let item of this.controls; index as i"
      class="repeat-data-item"
    >
      <div class="repeat-data-item-text">
        {{ this.resolveItemText(item, i) }}
      </div>
      <div class="repeat-data-section">
        <ddforms-section-default
          [section]="this.section"
          [control]="item"
          [surpressText]="true"
        ></ddforms-section-default>
      </div>
      <div class="repeat-data-actions">
        <button
          class="button delete-button"
          (click)="this.deleteItem(i)"
          type="button"
        >
          Delete
        </button>
        <!-- <button
          class="button edit-button"
          (click)="this.editItem(i)"
          type="button"
        >
          Edit
        </button> -->
      </div>
    </div>
  </div>`,
  styles: [],
})
export class RepeatDataDefaultComponent
  extends RenderRepeatDataBaseComponent
  implements OnInit
{
  // create edit as an event emitter of numbers
  edit = new EventEmitter<number>();
  itemSection!: Section;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.itemSection = new Section({ ...this.section });
    this.itemSection.repeat = undefined;
  }

  get controls(): AbstractControl[] {
    if (!this.data) return [];
    return (this.data as UntypedFormArray).controls;
  }

  editItem(index: number): void {
    this.edit.emit(index);
  }

  deleteItem(index: number): void {
    //if data defined and data is a form array then remove the control at the index
    if (this.data && this.data instanceof UntypedFormArray) {
      this.data.removeAt(index);
    }
  }

  resolveItemText(item: AbstractControl, index: number): string {
    let resultText = this.section.repeat?.itemHeader ?? 'Item $index';

    if (resultText.includes('$index')) {
      resultText = resultText.replace('$index', (index + 1).toString());
    }

    if (resultText.match(/\$control.[^ ]+/g)) {
      resultText = resultText.replace(
        /\$control.[^ ]+/g,
        (match) => item.get(match.replace('$control.', ''))?.value
      );
    }

    return resultText;
  }

  get classes(): string {
    if (!this.section.customProps) return '';
    if (!this.section.customProps['repeatDataClasses']) return '';
    return this.section.customProps['repeatDataClasses'];
  }
}
