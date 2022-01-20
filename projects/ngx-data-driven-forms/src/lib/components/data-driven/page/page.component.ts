import {Component, Input, OnInit} from '@angular/core';
import {Page} from '../../../forms-config';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'ddforms-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() config: Page | null = null;
  @Input() control: AbstractControl | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
