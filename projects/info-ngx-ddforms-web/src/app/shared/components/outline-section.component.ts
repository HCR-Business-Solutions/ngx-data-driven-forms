import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outline-section',
  template: `
    <section
      class="p-2 relative border-2 border-inherit rounded-tl-2xl rounded-br-2xl rounded-tr-xl rounded-bl-xl"
    >
      <div
        class="absolute top-[-40px] sm:top-[-15px] left-[8px] sm:left-10 bg-white px-4"
      >
        <ng-content select="[sectionTitle]"></ng-content>
      </div>
      <ng-content select="[sectionContent]"></ng-content>
    </section>
  `,
  styles: [],
})
export class OutlineSectionComponent {
  constructor() {}
}
