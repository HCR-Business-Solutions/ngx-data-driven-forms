import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Section} from '../../../../shared/form-config';

@Component({
  selector: 'ddforms-section-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class SectionTableComponent implements OnInit {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
