import { Component } from '@angular/core';

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
