import {Component, Input, OnInit} from '@angular/core';
import {Application} from '../../../forms-config';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'ddforms-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  @Input() config: Application | null = null;
  @Input() control: AbstractControl | null = null;

  constructor() {
  }

  ngOnInit(): void {
  }

}
