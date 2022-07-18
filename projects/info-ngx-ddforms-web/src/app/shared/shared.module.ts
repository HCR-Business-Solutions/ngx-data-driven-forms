import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo.component';
import { OutlineSectionComponent } from './components/outline-section.component';
import {
  DDFormsCoreModule,
  DDFormsDefaultsModule,
} from 'ngx-data-driven-forms/src/public-api';
import { MarkdownModule } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeFormWrapperComponent } from './components/safe-form-wrapper.component';

@NgModule({
  declarations: [
    LogoComponent,
    OutlineSectionComponent,
    SafeFormWrapperComponent,
  ],
  imports: [
    CommonModule,
    DDFormsCoreModule,
    DDFormsDefaultsModule,
    MarkdownModule,
    ReactiveFormsModule,
  ],
  exports: [
    LogoComponent,
    OutlineSectionComponent,
    MarkdownModule,
    ReactiveFormsModule,
    SafeFormWrapperComponent,
  ],
})
export class SharedModule {}
