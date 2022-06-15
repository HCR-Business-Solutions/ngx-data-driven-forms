import { Component } from '@angular/core';
import {
  Application,
  FormGenerationService,
} from 'ngx-data-driven-forms/src/public-api';

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
              testTextQuestion: {
                id: 'testTextQuestion',
                type: 'text',
                label: 'Test Text Question',
                hint: '> Test hint for text input with **bold** and *italics* and a [link](http://google.com).',
              },
              testDateQuestion: {
                id: 'testDateQuestion',
                type: 'date',
                label: 'Test Date Question',
                hint: 'test question',
              },
              testDatetimeLocalQuestion: {
                id: 'testDatetimeLocalQuestion',
                type: 'datetime-local',
                label: 'Test Datetime Local Question',
                hint: 'test question',
              },
              testMonthQuestion: {
                id: 'testMonthQuestion',
                type: 'month',
                label: 'Test Month Question',
                hint: 'test question',
              },
              testWeekQuestion: {
                id: 'testWeekQuestion',
                type: 'week',
                label: 'Test Week Question',
                hint: 'test question',
              },
              testTimeQuestion: {
                id: 'testTimeQuestion',
                type: 'time',
                label: 'Test Time Question',
                hint: 'test question',
              },
              testEmailQuestion: {
                id: 'testEmailQuestion',
                type: 'email',
                label: 'Test Email Question',
                hint: 'test question',
              },
              testUrlQuestion: {
                id: 'testUrlQuestion',
                type: 'url',
                label: 'Test URL Question',
                hint: 'test question',
              },
              testNumberQuestion: {
                id: 'testNumberQuestion',
                type: 'number',
                label: 'Test Number Question',
                hint: 'test question',
              },
              testPasswordQuestion: {
                id: 'testPasswordQuestion',
                type: 'password',
                label: 'Test Password Question',
                hint: 'test question',
              },
            },
            layout: [
              'testTextQuestion',
              'testDateQuestion',
              'testDatetimeLocalQuestion',
              'testMonthQuestion',
              'testWeekQuestion',
              'testTimeQuestion',
              'testEmailQuestion',
              'testUrlQuestion',
              'testNumberQuestion',
              'testPasswordQuestion',
            ],
          },
          {
            id: 'testSection2',
            questions: {
              testQuestion2: {
                id: 'testQuestion2',
                type: 'text',
                label: 'Test Question 2',
                hint: 'test question',
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

  testControl = this.formGenerator.buildApplicationControl(
    null,
    this.testApplication
  );

  title = 'info-ngx-ddforms-web';

  constructor(private formGenerator: FormGenerationService) {}
}
