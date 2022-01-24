import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ApplicationStateManagerService, DataDrivenFormsService  } from '../../../services';
import { IApplicationMeta } from '../../../_interfaces/application-meta';
import { Page, Application } from '../../../forms-config';

@Component({
  selector: 'ddforms-application-navigation',
  templateUrl: './application-navigation.component.html',
  styleUrls: ['./application-navigation.component.scss']
})
export class ApplicationNavigationComponent implements OnInit {

  @Input() meta: IApplicationMeta | null = null;
  @Input() config: Application | null = null;
  @Input() control: AbstractControl | null = null;

  constructor(
    private ddForms: DataDrivenFormsService,
    private appState: ApplicationStateManagerService,
  ) { }

  ngOnInit(): void {
  }

  public nextPageRecursive(pageIndex?: number): Page | null {
    if (!this.meta || !this.config || !this.control) return null;
    pageIndex = pageIndex ?? this.meta.currentPage;
    const nextPage = this.config.pages[pageIndex + 1] ?? null;
    if (!nextPage) return null;

    //TODO: Perform Should Ask
    const shouldAsk = true;
    return shouldAsk ? nextPage : this.nextPageRecursive(pageIndex + 1);
  }

  public get nextPage(): Page | null {
    return this.nextPageRecursive();
  }

  public get showNext(): boolean {
    if (!this.meta || !this.config || !this.control) return false;
    const nextPage = this.config.pages[this.meta.currentPage + 1] ?? undefined;
    if (!nextPage) return false;

    //TODO: Run Should Ask Page
    const shouldAsk = true;
    return shouldAsk;
  }

  public get showSubmit(): boolean {
    if (!this.meta || !this.config || !this.control) return false;
    const nextPage = this.config.pages[this.meta.currentPage + 1] ?? undefined;
    if (!nextPage) return true;

    //TODO: Run Should Ask Page
    const shouldAsk = true;
    return !shouldAsk;

  }

  public onSubmit(): void {

  }

  public onNext(): void {
    if (!this.config || !this.control || !this.meta) return;
    const currentPage = this.config.pages[this.meta.currentPage] ?? undefined;
    if (!currentPage) return;

    const currentPageControl = this.control.get(currentPage.id);
    if (!currentPageControl) return;

  }

}
