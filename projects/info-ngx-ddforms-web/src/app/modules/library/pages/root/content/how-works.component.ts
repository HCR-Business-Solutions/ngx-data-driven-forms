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
          <div
            class="border-2 border-gray-400 border-opacity-60 rounded-md px-8 py-2"
          >
            <div [ngSwitch]="this.displaySection">
              <ng-container *ngSwitchCase="'form'">
                <ddforms-application-container
                  [application]="this.contactForm"
                  [control]="this.contactControl"
                  class="w-full py-4"
                ></ddforms-application-container>
              </ng-container>
              <ng-container *ngSwitchCase="'config'">
                <code>
                  <pre>{{ this.contactForm | json }}</pre>
                </code>
              </ng-container>
              <ng-container *ngSwitchDefault>
                <code>
                  <pre>{{ this.contactControl.getRawValue() | json }}</pre>
                </code>
              </ng-container>
            </div>
          </div>
          <div
            class="self-center flex flex-row items-center justify-center gap-4"
          >
            <button (click)="this.setDisplaySection('form')">Form</button>
            <button (click)="this.setDisplaySection('config')">Config</button>
            <button (click)="this.setDisplaySection('data')">Data</button>
          </div>
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
            },
            layout: ['firstName', 'lastName', 'gender', 'age'],
          },
        ],
      },
    ],
  });

  contactControl = this.ddFormsGenerator.buildApplicationControl(
    null,
    this.contactForm
  );

  constructor(private ddFormsGenerator: FormGenerationService) {}

  public setDisplaySection(target: 'form' | 'config' | 'data') {
    if (target === this.displaySection) return;
    this.displaySection = target;
  }
}
