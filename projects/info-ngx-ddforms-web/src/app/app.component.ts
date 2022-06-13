import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Application } from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  testApplication = new Application({
    id: 'testApplication',
    description: 'Test Application.',
    pages: [
      {
        id: 'test1',
        sections: [
          {
            id: 'testSection1',
            questions: {
              testQuestion1: {
                id: 'testQuestion1',
                type: 'text',
              },
            },
            layout: ['testQuestion1'],
          },
          {
            id: 'testSection2',
            questions: {
              testQuestion2: {
                id: 'testQuestion2',
                type: 'text',
              },
            },
            layout: ['testQuestion2'],
            repeat: {
              handler: 'default',
            },
          },
        ],
      },
    ],
  });

  testControl = this.fb.group({
    test1: this.fb.group({
      testSection1: this.fb.group({
        testQuestion1: this.fb.control(null),
      }),
      testSection2: this.fb.array([]),
    }),
  });

  title = 'info-ngx-ddforms-web';

  constructor(private fb: FormBuilder) {}
}
