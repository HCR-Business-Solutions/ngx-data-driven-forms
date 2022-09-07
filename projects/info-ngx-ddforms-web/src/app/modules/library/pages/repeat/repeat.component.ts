import { Component, OnInit } from '@angular/core';
import { LayoutStateService } from 'projects/info-ngx-ddforms-web/src/app/core/service/layout-state/layout-state.service';

@Component({
  template: `
    <article class="flex flex-col p-4 mt-8 gap-20 items-center w-full">
      <app-repeat-example class="w-full md:w-3/4"></app-repeat-example>
    </article>
  `,
  styles: [],
})
export class RepeatComponent {
  constructor(private layoutSvc: LayoutStateService) {
    this.layoutSvc.showToolbar();
  }

  // ngOnInit(): void {
  // }
}
