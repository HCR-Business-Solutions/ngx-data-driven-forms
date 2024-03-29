import { Component, OnInit } from '@angular/core';
import { LayoutStateService } from '../service/layout-state/layout-state.service';

@Component({
  selector: 'app-toolbar',
  template: `
    <ng-container *ngIf="this.layoutSvc.toolbarVisible$ | async as isVisible">
      <ng-container *ngIf="isVisible">
        <header class="flex flex-col sticky top-0 z-50">
          <div class="flex flex-row items-center pb-2 bg-amber-700">
            <div
              class="text-[.5rem] text-white ml-2 flex flex-row items-center"
            >
              <a routerLink="/" class="text-white hover:no-underline">
                <app-logo [short]="true"></app-logo>
              </a>
              <div class="text-xl font-bold ml-3 mt-[.5rem]">
                Data Driven Forms
              </div>
            </div>
          </div>
        </header>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class ToolbarComponent {
  constructor(public layoutSvc: LayoutStateService) {}
}
