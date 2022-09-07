import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-what-is',
  template: `
    <app-outline-section class="border-amber-600 w-full">
      <h1 sectionTitle class="text-xl">
        <b class="text-amber-600">What</b> is Data Driven Forms?
      </h1>
      <div sectionContent class="p-2 flex flex-col gap-2">
        <p>
          Data Driven Forms(DDForms) is a Angular Component Library that
          provides a method to quickly create forms from only a JSON file.
        </p>
        <p>
          The library provides a render scheme that allows for near complete
          control and total customability
        </p>
      </div>
    </app-outline-section>
  `,
  styles: [],
})
export class WhatIsComponent {
  constructor() {}
}
