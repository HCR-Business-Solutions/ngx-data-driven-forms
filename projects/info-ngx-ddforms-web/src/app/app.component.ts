import { Component, OnInit } from '@angular/core';
import {
  IQuestion,
  SchemaValidatorService,
} from 'ngx-data-driven-forms/src/public-api';
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
export class AppComponent implements OnInit {
  constructor(private schemavalidator: SchemaValidatorService) {}

  public ngOnInit(): void {
    // const validatorResult = this.schemavalidator.validateQuestionSchema(
    //   this.question
    // );
    // console.log(validatorResult);
  }
}
