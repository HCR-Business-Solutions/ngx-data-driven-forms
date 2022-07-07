import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styles: [],
})
export class LogoComponent {
  @Input() short: boolean = false;
  @Input() animate: boolean = false;
  constructor() {}
}
