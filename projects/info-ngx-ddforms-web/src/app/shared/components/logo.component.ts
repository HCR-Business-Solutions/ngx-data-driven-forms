import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo',
  template: `
    <div class="flex flex-row items-center select-none">
      <div class="text-[8em] leading-[1.25em]">{{ '{' }}</div>
      <div
        class="flex flex-col items-center content-center pt-[1.5em] text-[1em]"
      >
        <div class="font-bold">ngx</div>
        <div
          class="flex items-center content-center"
          [ngClass]="{ 'flex-col': !this.short, 'flex-row': this.short }"
        >
          <div>
            <span class="font-bold">d</span><span *ngIf="!this.short">ata</span>
          </div>
          <div>
            <span class="font-bold">d</span
            ><span *ngIf="!this.short">riven</span>
          </div>
          <div>
            <span class="font-bold">f</span
            ><span *ngIf="!this.short">orms</span>
          </div>
        </div>
      </div>
      <div class="text-[8em] leading-[1.25em]">}</div>
    </div>
  `,
  styles: [],
})
export class LogoComponent {
  @Input() short: boolean = false;
  @Input() animate: boolean = false;
  constructor() {}
}
