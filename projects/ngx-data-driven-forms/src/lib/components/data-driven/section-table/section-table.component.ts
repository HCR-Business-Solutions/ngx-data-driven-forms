import {Component, Input, OnInit} from '@angular/core';
import {Section} from '../../../forms-config';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'ddforms-section-table',
  templateUrl: './section-table.component.html',
  styleUrls: ['./section-table.component.scss']
})
export class SectionTableComponent implements OnInit {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
