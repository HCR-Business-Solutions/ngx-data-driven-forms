import { Component, OnInit } from '@angular/core';
import { LayoutStateService } from 'projects/info-ngx-ddforms-web/src/app/core/service/layout-state/layout-state.service';

@Component({
  template: `
    <article class="flex flex-col p-4 mt-8 gap-20 items-center w-full">
      <app-what-is class="w-full md:3/4"></app-what-is>
      <app-how-works class="w-full"></app-how-works>
    </article>
  `,
  styles: [],
})
export class RootComponent {
  constructor(private layoutSvc: LayoutStateService) {
    this.layoutSvc.showToolbar();
  }
}
