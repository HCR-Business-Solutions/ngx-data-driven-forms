import { Component, OnInit } from '@angular/core';
import { DataDrivenFormsService, IApplication } from 'ngx-data-driven-forms';
import { ApplicationStateManagerService } from 'projects/ngx-data-driven-forms/src/lib';

@Component({
  templateUrl: './application-example.component.html',
  styleUrls: ['./application-example.component.scss']
})
export class ApplicationExampleComponent implements OnInit {

  private readonly testingAplication: IApplication = {
    id: 'test',
    description: 'Testing Application',
    pages: [
      {
        id: 'basicInfo',
        title: 'Basic Information',
        sections: [
          {
            id: 'name',
            questions: {
              first: {
                id: 'first',
                type: 'text',
                label: {
                  text: 'First Name'
                },
                validation: {
                  required: true,
                }
              },
              last: {
                id: 'last',
                type: 'text',
                label: {
                  text: 'Last Name'
                },
                validation: {
                  required: true,
                }
              }
            },
            questionOrder: ['first', 'last']
          },
          {
            id: 'demographics',
            questions: {
              gender: {
                id: 'gender',
                type: 'radio',
                label: {
                  text: 'Gender'
                },
                options: [
                  {value: 'M', display: 'Male'},
                  {value: 'F', display: 'Female'},
                  {value: 'X', display: 'Non-Binary'},
                  {value: 'O', display: 'Other'},
                  {value: '?', display: 'Prefer Not To Answer'}
                ]
              }
            },
            questionOrder: ['gender']
          }
        ]
      },
    ]
  }

  constructor(
    private appState: ApplicationStateManagerService,
  ) { }

  ngOnInit(): void {
    this.appState.setup(null, this.testingAplication, undefined, false);
  }

}
