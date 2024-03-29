import { Component, OnInit } from '@angular/core';
import { LayoutStateService } from 'projects/info-ngx-ddforms-web/src/app/core/service/layout-state/layout-state.service';

@Component({
  template: `
    <article class="grid place-items-center h-screen w-screen">
      <div class="flex flex-col items-center justify-center gap-3 p-4">
        <app-logo [short]="false" class="text-xl"></app-logo>
        <div>
          <h1 class="text-2xl inline-flex flex-col md:flex-row">
            <div>
              <span class="text-bold text-amber-600">Welcome</span> to&nbsp;
            </div>
            <a
              href="https://www.npmjs.com/package/@nys-hcr-its/ngx-data-driven-forms"
              target="_blank"
              rel="noopener"
              title="npm page for ngx-data-driven-forms"
              class="transition-all hover:no-underline cursor-pointer border-b-2 text-inherit border-amber-600 hover:border-amber-800 hover:border-b-4 hover:text-amber-600"
              >Data Driven Forms</a
            >
          </h1>
          <p class="mt-2 font-thin italic">
            Quickly generate Web Forms with JSON objects!
          </p>
        </div>
        <div class="mt-4">
          <a routerLink="/library">
            <button
              class="bg-amber-600 hover:bg-amber-800 transition-colors p-3 text-white border-2 font-bold border-amber-900 border-opacity-40 rounded-2xl"
            >
              Explore the Library &rarr;
            </button>
          </a>
        </div>
      </div>
      <div class="text-xs text-center">
        Developed by <a>Rei Armenia</a><br />
        with <span>New York State ITS, HCR Business Solutions</span>
      </div>
    </article>
  `,
  styles: [],
})
export class RootComponent {
  constructor(private layoutSvc: LayoutStateService) {
    this.layoutSvc.hideToolbar();
  }
}
