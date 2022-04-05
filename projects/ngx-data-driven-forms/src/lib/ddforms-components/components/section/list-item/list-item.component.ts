import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Section } from '../../../../shared/form-config';
import { AbstractControl } from '@angular/forms';
import { DataDrivenFormsConfigService } from '../../../../ddforms/services';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  animateChild,
  state,
} from '@angular/animations';

@Component({
  selector: 'ddforms-section-list-item',
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)', marginTop: '0.18rem' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in')),
    ]),
  ],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class SectionListItemComponent implements OnInit {
  showDetails: boolean = false;
  state: string = 'default';

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;
  @Input() index: number | null = null;
  @Output() edit: EventEmitter<{ control: AbstractControl; index: number }> =
    new EventEmitter<{ control: AbstractControl; index: number }>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  public useDefaultStyles: boolean = !this.ddFormsConf.getShouldIgnoreStyles();

  constructor(private ddFormsConf: DataDrivenFormsConfigService) {}

  ngOnInit(): void {}

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

  public showHideDetails() {
    this.showDetails = !this.showDetails;

    this.state = this.state === 'default' ? 'rotated' : 'default';
  }
}
