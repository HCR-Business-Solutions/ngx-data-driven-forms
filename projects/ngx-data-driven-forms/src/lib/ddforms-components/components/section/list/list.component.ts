import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';
import {Section} from '../../../../shared/form-config';
import { DataDrivenFormsConfigService } from '../../../../ddforms/services';

@Component({
  selector: 'ddforms-section-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class SectionListComponent implements OnInit {

  @Input() config: Section | null = null; 
  @Input() control: AbstractControl | null = null;

  public readonly inputStyle: 'flat' | 'modal' = this.ddFormsConf.getRepeatInputStyle();

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService
  ) {
  }

  public get isFormArray(): boolean {
    if (!this.control) return false;
    return (this.control instanceof FormArray);
  }

  public get formControls(): AbstractControl[] {
    return this.control ? (this.control as FormArray).controls : [];
  }

  ngOnInit(): void {
  }

}
