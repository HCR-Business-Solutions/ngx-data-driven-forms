import {Component, Input, OnInit} from '@angular/core';
import {Section} from '../../../forms-config';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'ddforms-section-list-item',
  templateUrl: './section-list-item.component.html',
  styleUrls: ['./section-list-item.component.scss']
})
export class SectionListItemComponent implements OnInit {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
