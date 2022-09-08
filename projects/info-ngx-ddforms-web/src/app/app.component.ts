import { Component } from '@angular/core';
import { FormGenerationService } from 'dist/ngx-data-driven-forms/public-api';
import { Application } from 'ngx-data-driven-forms/src/lib/core';

@Component({
  selector: 'app-root',
  template: `<div>
    <ddforms-application-container
      [application]="this.applicationObject"
    ></ddforms-application-container>
  </div>`,
  styles: [],
})
export class AppComponent {
  constructor(public formGenerator: FormGenerationService) {}

  applicationObject = new Application({
    id: 'exampleApp',
    description: 'an example application',
    pages: [
      {
        id: 'contact',
        sections: [
          {
            id: 'name',
            questions: {
              firstName: {
                id: 'firstName',
                type: 'text',
                label: 'First Name',
                fieldValidation: {
                  required: true,
                },
              },
              lastName: {
                id: 'lastName',
                type: 'text',
                label: 'Last Name',
                fieldValidation: {
                  required: true,
                },
              },
            },
            layout: ['firstName', 'lastName'],
          },
          {
            id: 'address',
            questions: {
              address: {
                id: 'address',
                type: 'text',
                label: 'Address',
                fieldValidation: {
                  required: true,
                },
              },
              city: {
                id: 'city',
                type: 'text',
                label: 'City',
                fieldValidation: {
                  required: true,
                },
              },
              state: {
                id: 'state',
                type: 'text',
                label: 'State',
                fieldValidation: {
                  required: true,
                },
              },
              zip: {
                id: 'zip',
                type: 'text',
                label: 'Zip',
                fieldValidation: {
                  required: true,
                },
              },
            },
            layout: ['address', 'city', 'state', 'zip'],
          },
        ],
      },
    ],
  });
}
