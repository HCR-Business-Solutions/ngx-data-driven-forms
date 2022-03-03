import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {DataDrivenFormsConfigService} from '../../../ddforms/services';
import {Page} from '../../../shared/form-config';

@Component({
  selector: 'ddforms-page',
  templateUrl: './page.component.html',
})
export class PageComponent implements OnInit {

  @Input() config: Page | null = null;
  @Input() control: AbstractControl | null = null;
  public useDefaultStyles = !this.ddFormsConf.getShouldIgnoreStyles();

  constructor(
    private ddFormsConf: DataDrivenFormsConfigService
  ) {
  }

  ngOnInit(): void {
  }

}
