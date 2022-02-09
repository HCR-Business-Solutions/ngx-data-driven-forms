import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApplicationComponent,
  PageComponent,
  QuestionComponent,
  SectionContainerComponent,
  SectionListComponent,
  SectionListItemComponent,
  SectionSingleComponent,
  SectionTableComponent,
} from './components';
import { SharedModule } from '../shared';

const COMPONENTS = [
  ApplicationComponent,
  PageComponent,
  QuestionComponent,
  SectionContainerComponent,
  SectionListComponent,
  SectionListItemComponent,
  SectionSingleComponent,
  SectionTableComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class DDFormsComponentsModule {}
