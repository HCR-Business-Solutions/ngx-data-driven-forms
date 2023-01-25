import { Component, OnInit } from '@angular/core';
import {
  Application,
  FormGenerationService,
} from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'app-how-works',
  template: `
    <app-outline-section class="border-amber-600 w-full">
      <h1 sectionTitle class="text-xl">
        <b class="text-amber-600">How</b> does it work?
      </h1>
      <div sectionContent class="p-2 flex flex-col gap-4">
        <p>
          DDForms uses a dynamic rendering engine to place components in the DOM
          at run time based on the provided JSON file. Using our Defaults
          Module, you will have access to build almost any basic form.
        </p>
        <div class="flex flex-col w-full gap-2">
          <div>
            <h2 class="text-[1.125rem] font-semibold">Example</h2>
            <p class="text-sm italic">
              The following is an example of a contact information form built
              with DDForms.
            </p>
          </div>
          <app-form-data-config-example
            [appConfig]="this.contactForm"
          ></app-form-data-config-example>
        </div>
      </div>
    </app-outline-section>
  `,
  styles: [
    `
      markdown h1 {
        font: 1.25rem;
        margin-botton: 0.5rem;
      }
    `,
  ],
})
export class HowWorksComponent {
  displaySection: 'form' | 'config' | 'data' = 'form';

  formValue: any | null = null;

  contactForm: Application = new Application({
    id: 'contact',
    description: 'An Example Contact Form',
    pages: [
      {
        id: 'contactInfo',
        title: '# Contact Information',
        sections: [
          {
            id: 'identity',
            questions: {
              firstName: {
                id: 'firstName',
                type: 'text',
                label: 'First Name',
              },
              lastName: {
                id: 'lastName',
                type: 'text',
                label: 'Last Name',
              },
              gender: {
                id: 'gender',
                type: 'select',
                label: 'Gender',
                customProps: {
                  options: [
                    { display: 'Male', value: 'M' },
                    { display: 'Female', value: 'F' },
                    { display: 'Non-Binary', value: 'NB' },
                    { display: 'Agender', value: 'A' },
                  ],
                },
              },
              age: {
                id: 'age',
                type: 'number',
                label: 'Age',
              },
              phoneType: {
                id: 'phoneType',
                type: 'select',
                label: 'Phone Type',
                customProps: {
                  options: [
                    { display: 'None', value: 'None' },
                    { display: 'Mobile', value: 'Mobile' },
                    { display: 'Landline', value: 'Landline' },
                  ],
                },
              },
              phoneNumber: {
                id: 'phoneNumber',
                type: 'mask',
                label: 'Phone Number',
                inputMode: 'tel',
                customProps: {
                  mask: '(000)000-0000',
                  prefix: '+1 ',
                  showTemplate: true,
                  showMaskTyped: true,
                },
                shouldAsk: {
                  conditions: [
                    {
                      sibling: 'phoneType',
                      expectedParentLevel: 1,
                      conditions: {
                        valueNotMatch: 'None',
                      },
                    },
                  ],
                },
              },
              contactPreference: {
                id: 'contactPreference',
                type: 'multiselect',
                label: 'How would you like to be contacted.',
                customProps: {
                  options: [
                    {
                      display: 'Call',
                      value: 'C',
                    },
                    {
                      display: 'Text',
                      value: 'T',
                    },
                  ],
                },
                shouldAsk: {
                  conditions: [
                    {
                      sibling: 'phoneType',
                      expectedParentLevel: 1,
                      conditions: { valueMatch: 'Mobile' },
                    },
                  ],
                },
                fieldValidation: {
                  jsonRequired: true,
                },
              },
              callTime: {
                id: 'callTime',
                type: 'text',
                label: 'What time would you like to be called?',
                shouldAsk: {
                  conditions: [
                    {
                      sibling: 'contactPreference',
                      expectedParentLevel: 1,
                      conditions: { containsValue: 'C' },
                    },
                  ],
                },
              },
            },
            layout: [
              ['firstName', 'lastName'],
              'gender',
              'age',
              [['phoneType', 'phoneNumber'], 'contactPreference', 'callTime'],
            ],
          },
        ],
      },
    ],
  });

  constructor() {}
}
