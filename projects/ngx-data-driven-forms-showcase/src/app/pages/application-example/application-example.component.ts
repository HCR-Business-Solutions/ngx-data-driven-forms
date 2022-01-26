import {Component, OnInit} from '@angular/core';

import {ApplicationStateManagerService, IApplication} from '../../../../../ngx-data-driven-forms/src/lib';

@Component({
  templateUrl: './application-example.component.html',
  styleUrls: ['./application-example.component.scss']
})
export class ApplicationExampleComponent implements OnInit {

  private readonly testingApplication: IApplication = {
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
              },
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
          },
          {
            id: 'contact',
            questions: {
              email: {
                id: 'email',
                type: 'email',
                label: {
                  text: 'Email'
                },
                placeholder: 'email@email.com'
              },
              phone: {
                id: 'phone',
                type: 'tel',
                label: {
                  text: 'Phone Number'
                }
              },
              phoneType: {
                id: 'phoneType',
                type: 'radio',
                label: {
                  text: 'Phone Type'
                },
                options: [
                  {value: 'Landline', display: 'Landline'},
                  {value: 'Mobile', display: 'Mobile'}
                ]
              },
              optInText: {
                id: 'optInText',
                type: 'radio',
                label: {
                  text: 'Do you want to receive text messages',
                },
                options: [
                  {value: 'Y', display: 'Yes'},
                  {value: 'N', display: 'No'},
                ],
                shouldAsk: {
                  statements: [
                    {
                      sibling: 'phoneType',
                      expectedParentLevel: 1,
                      check: 'one',
                      conditions: {
                        valueMatches: 'Mobile'
                      }
                    }
                  ]
                }
              }
            },
            questionOrder: ['email', 'phone', 'phoneType', 'optInText']
          }
        ]
      },
    ]
  }

  constructor(
    private appState: ApplicationStateManagerService,
  ) { }

  ngOnInit(): void {
    this.appState.setup(null, this.testingApplication, undefined, false);
  }

}
