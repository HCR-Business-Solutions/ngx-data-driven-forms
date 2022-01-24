import { Component, OnInit } from '@angular/core';
import { DataDrivenFormsService } from 'ngx-data-driven-forms';
import { ApplicationStateManagerService } from 'projects/ngx-data-driven-forms/src/lib';

@Component({
  templateUrl: './application-example.component.html',
  styleUrls: ['./application-example.component.scss']
})
export class ApplicationExampleComponent implements OnInit {

  private readonly testingAplication = {
    id: 'test',
    description: 'Testing Application',
    pages: [
      {
        id: 'page0',
        sections: [
          {
            id: 'testSection',
            questions: {
              test: {
                id: 'test',
                type: 'text',
                label: {
                  text: 'Test Question'
                }
              }
            },
            questionOrder: ['test']
          }
        ]
      },
      {
        id: 'page1',
        sections: [
          {
            id: 'testSection2',
            questions: {
              test2: {
                id: 'test2',
                type: 'text',
                label: {
                  text: 'Test Question 2'
                }
              }
            },
            questionOrder: ['test2']
          }
        ]
      }
    ]
  }

  constructor(
    private appState: ApplicationStateManagerService,
  ) { }

  ngOnInit(): void {
    this.appState.setup(null, this.testingAplication, undefined, false);
  }

}
