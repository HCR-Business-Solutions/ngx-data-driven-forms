import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { RootComponent } from './pages/root';
import { WhatIsComponent } from './pages/root/content/what-is.component';
import { HowWorksComponent } from './pages/root/content/how-works.component';
import {
  DDFormsCoreModule,
  DDFormsDefaultsModule,
} from 'ngx-data-driven-forms/src/public-api';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [RootComponent, WhatIsComponent, HowWorksComponent],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    SharedModule,
    DDFormsCoreModule,
    DDFormsDefaultsModule,
    MarkdownModule,
  ],
})
export class LibraryModule {}
