import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Section} from '../../../../shared/form-config';
import {AbstractControl} from '@angular/forms';
import {DataDrivenFormsConfigService} from '../../../../ddforms/services';

@Component({
  selector: 'ddforms-section-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: [
    './list-item.component.scss'
  ]
})
export class SectionListItemComponent implements OnInit {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() index: number | null = null;
  @Output() edit: EventEmitter<{ control: AbstractControl, index: number }> = new EventEmitter<{ control: AbstractControl, index: number }>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  public useDefaultStyles: boolean = !this.ddFormsConf.getShouldIgnoreStyles();

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService
  ) {
  }

  ngOnInit(): void {
  }

  public handleEdit() {
    if (!this.control || this.index === null) return;
    this.edit.emit({
      control: this.control,
      index: this.index,
    });
  }

  public handleDelete() {
    if (this.index === null) return;
    this.delete.emit(this.index);
  }

}
