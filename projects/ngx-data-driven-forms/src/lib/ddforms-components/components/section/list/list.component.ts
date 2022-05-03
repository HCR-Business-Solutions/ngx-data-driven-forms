import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';
import { Section } from '../../../../shared/form-config';
import { DataDrivenFormsConfigService } from '../../../../ddforms/services';

@Component({
  selector: 'ddforms-section-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class SectionListComponent implements OnInit {
  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  @Output() edit: EventEmitter<{ control: AbstractControl; index: number }> =
    new EventEmitter<{ control: AbstractControl; index: number }>();

    @Output() delete: EventEmitter<number> = new EventEmitter<number>();

 

  public useDefaultStyles: boolean = !this.ddFormsConf.getShouldIgnoreStyles();

  constructor(private ddFormsConf: DataDrivenFormsConfigService) {}

  public get isFormArray(): boolean {
    if (!this.control) return false;
    return this.control instanceof FormArray;
  }

  public get formControls(): AbstractControl[] {
    return this.control ? (this.control as FormArray).controls : [];
  }

  ngOnInit(): void {}

  public handleEdit(event: { control: AbstractControl; index: number }) {
    console.log('edit');
    this.edit.emit(event);
  }


  public handleDelete(event: number) {
    console.log('delete');
    this.delete.emit(event);
  }

}
