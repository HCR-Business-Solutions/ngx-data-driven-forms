import {Component, OnInit} from '@angular/core';
import {IApplication} from '../../../../../ngx-data-driven-forms/src/lib/shared';
import {
  ApplicationStateManagerService,
} from '../../../../../ngx-data-driven-forms/src/lib/ddforms';

@Component({
  selector: 'app-application-example',
  templateUrl: './application-example.component.html',
  styles: [
  ]
})
export class ApplicationExampleComponent implements OnInit {

  private _config: IApplication = {
    id: 'exampleApplication',
    description: 'An application example to show off some of the basic functions. Mocking up an Insurance Claim Form.',
    pages: [
      {
        id: 'namePage',
        navigationName: 'Name',
        sections: [
          {
            id: 'name',
            questions: {
              first: {
                id: 'first',
                type: 'text',
                label: '$!(abbr: FN, First Name)',
                validation: {
                  required: true,
                },
              },
              middle: {
                id: 'middle',
                type: 'text',
                label: '$!(b: Middle) Name'
              },
              last: {
                id: 'last',
                type: 'text',
                label: '$!(b: $!(i: Last)) Name'
              },
            },
            questionOrder: [
              'first',
              'middle',
              'last',
            ]
          }
        ]
      },
      {
        id: 'contactPage',
        navigationName: 'Contact Info',
        sections: [
          {
            id: 'phone',
            questions: {
              number: {
                id: 'number',
                type: 'tel',
                label: 'Telephone Number',
                validation: {
                  required: true,
                },
              },
              type: {
                id: 'type',
                type: 'radio',
                label: 'Phone Type',
                fieldConfig: {
                  options: [
                    {display: 'Mobile', value: 'M'},
                    {display: 'Landline', value: 'L'}
                  ],
                },
              },
              allowTexts: {
                id: 'allowTexts',
                type: 'radio',
                label: 'Allow Text Messages',
                fieldConfig: {
                  options: [
                    {display: 'Yes', value: 'Y'},
                    {display: 'No', value: 'N'}
                  ]
                },
                shouldAsk: {
                  statements: [
                    {
                      sibling: 'type',
                      expectedParentLevel: 1,
                      conditions: {
                        valueMatches: 'M'
                      },
                    }
                  ]
                }
              }
            },
            questionOrder: ['number', 'type', 'allowTexts']
          }
        ]
      },
      {
        id: 'damagedProperty',
        navigationName: 'Damaged Property',
        sections: [
          {
            id: 'propertyItem',
            questions: {
              itemName: {
                id: 'itemName',
                type: 'text',
                label: 'Item Name',
                validation: {
                  required: true,
                  minLength: 2,
                  maxLength: 240
                }
              },
              itemType: {
                id: 'itemType',
                type: 'select',
                label: 'Item Type',
                hint: {text: 'Select the closest option.'},
                fieldConfig: {
                  options: [
                    {display: 'Furniture', value: 'furniture'},
                    {display: 'Appliance', value: 'appliance'},
                    {display: 'Permanent Fixture', value: 'permFixture'},
                    {display: 'Electronic', value: 'electronic'},
                    {display: 'Clothing', value: 'clothing'},
                    {display: 'Other', value: 'other'}
                  ]
                },
                validation: {
                  required: true,
                }
              },
              quantity: {
                id: 'quantity',
                type: 'number',
                label: 'Item Quantity',
                validation: {
                  required: true,
                  min: 1,
                  max: 99999,
                }
              },
              estimatedPrice: {
                id: 'estimatedPrice',
                type: 'currency',
                label: 'Estimated Price',
                validation: {
                  required: true,
                  min: 0.01,
                  max: 500000.01
                }
              },
            },
            questionOrder: ['itemName','itemType', 'quantity', 'estimatedPrice'],
            repeat: {
              style: 'list',
              minEntries: 1,
              itemName: 'Damaged Property Item',
              preserveList: true,
              useToggleView: true,
            }
          }
        ],
      },
    ]
  }

  constructor(
    private appStateSvc: ApplicationStateManagerService,
  ) { }

  ngOnInit(): void {
    this.appStateSvc.setup(null, this._config)
  }

}
