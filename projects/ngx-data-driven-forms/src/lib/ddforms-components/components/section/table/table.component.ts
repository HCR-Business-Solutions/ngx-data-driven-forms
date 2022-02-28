import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Section} from '../../../../shared/form-config';
import { DataDrivenFormsConfigService } from '../../../../ddforms/services';

@Component({
  selector: 'ddforms-section-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class SectionTableComponent implements OnInit {

  @Input() config: Section | null = null;
  @Input() control: AbstractControl | null = null;

  useDefaultStyles = !this.ddFormsConf.getShouldIgnoreStyles();
  
  constructor(
    private ddFormsConf: DataDrivenFormsConfigService
  ) {
  }

  ngOnInit(): void {
  }

}
