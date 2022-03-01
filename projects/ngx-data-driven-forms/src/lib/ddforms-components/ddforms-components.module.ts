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
import { MarkdownModule } from 'ngx-markdown';

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
    MarkdownModule.forChild()
  ],
  exports: [
    ...COMPONENTS,
    MarkdownModule
  ]
})
export class DDFormsComponentsModule {}
