import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Application, Page} from '../../../shared/form-config';
import {IApplicationMeta} from '../../../shared/interfaces';

@Component({
  selector: 'ddforms-application',
  templateUrl: './application.component.html',
})
export class ApplicationComponent {


  @Input() public config: Application | null | undefined;
  @Input() public control: AbstractControl | null | undefined;
  @Input() public meta: IApplicationMeta | null | undefined;

  constructor() {
  }

  public get currentPageConfig(): Page | null | undefined {

    if (!this.config || !this.control || !this.meta) return null;
    return this.config.pages[this.meta.currentPage] ?? undefined;

  }

  public get currentPageControl(): AbstractControl | null | undefined {
    if (!this.config || !this.control || !this.meta) return null;
    if (!this.currentPageConfig) return undefined;
    return this.control.get(this.currentPageConfig.id);

  }

}
