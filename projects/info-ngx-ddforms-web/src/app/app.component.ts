import { Component } from '@angular/core';
import {
  Application,
  FormGenerationService,
} from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'app-root',
  template: `<div>
    <app-toolbar></app-toolbar>
    <main class="bg-white">
      <router-outlet></router-outlet>
    </main>
  </div>`,
  styles: [],
})
export class AppComponent {
  constructor() {}
}
