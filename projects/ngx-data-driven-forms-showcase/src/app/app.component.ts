import { Component } from '@angular/core';
import {DataDrivenFormsConfigService, DataDrivenFormsService} from '../../../ngx-data-driven-forms/src/lib/ddforms';
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ApplicationExampleComponent} from './pages/application-example/application-example.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'ngx-data-driven-forms-showcase';

  constructor(
    private ddforms: DataDrivenFormsService,
    private ddformsConf: DataDrivenFormsConfigService,
  ){
    this.ddformsConf.registerValidator('asdf', () => (c: AbstractControl) => null);
  }

}
