import { Component } from '@angular/core';
import { DataDrivenFormsService } from '../../../ngx-data-driven-forms/src/lib/ddforms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'ngx-data-driven-forms-showcase';

  constructor(
    private ddforms: DataDrivenFormsService
  ){}

}
