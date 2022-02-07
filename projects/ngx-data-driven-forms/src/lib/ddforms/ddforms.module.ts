import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DDFormsComponentsModule } from '../ddforms-components';
import { DefaultFieldComponentsModule } from '../default-field-components';
import { SharedModule } from '../shared';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DDFormsComponentsModule,
    DefaultFieldComponentsModule,
    SharedModule,
  ],
  exports: [
    DDFormsComponentsModule,
    SharedModule,
  ]
})
export class DDFormsModule { }
