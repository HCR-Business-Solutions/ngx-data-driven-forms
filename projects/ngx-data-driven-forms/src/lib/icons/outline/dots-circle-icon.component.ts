import { Component } from '@angular/core';

@Component({
  selector: 'icon-dots-circle-outline',
  template: `<svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-auto w-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>`,
  styles: [],
})
export class DotsCircleIconOutlineComponent {
  constructor() {}
}
