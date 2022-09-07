import { Component, OnInit } from '@angular/core';
import { Application } from 'ngx-data-driven-forms/src/public-api';

@Component({
  selector: 'app-repeat-example',
  template: `
    <app-outline-section class="border-amber-600">
      <h1 sectionTitle class="text-xl">
        <b class="text-amber-600">See</b> it in action!
      </h1>
      <div sectionContent class="p-2 flex flex-col gap-4">
        <app-form-data-config-example
          [appConfig]="this.shoppingListForm"
        ></app-form-data-config-example>
      </div>
    </app-outline-section>
  `,
  styles: [],
})
export class RepeatExampleComponent {
  shoppingListForm: Application = new Application({
    id: 'shoppingList',
    description: 'An Example Shopping List',
    pages: [
      {
        id: 'items',
        title: '# Items',
        sections: [
          {
            id: 'itemCollection',
            questions: {
              itemName: {
                id: 'itemName',
                type: 'text',
                label: 'Item Name',
                fieldValidation: {
                  required: true,
                },
              },
              quantity: {
                id: 'quantity',
                type: 'number',
                label: 'Quantity',
                fieldValidation: {
                  required: true,
                },
              },
              cost: {
                id: 'cost',
                type: 'mask',
                label: 'Cost',
                inputMode: 'decimal',
                customProps: {
                  mask: 'separator',
                  prefix: '$',
                  thousandSeparator: ',',
                },
                fieldValidation: {
                  required: true,
                },
              },
            },
            layout: ['itemName', 'quantity', 'cost'],
            repeat: {
              handler: 'default',
              min: 1,
              addText: 'Add a new item to the shopping list',
              itemHeader: 'Item $index - $control.itemName',
            },
          },
        ],
      },
    ],
  });

  constructor() {}
}
