import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  DDFormsCoreModule,
  DDFormsDefaultsModule,
} from 'ngx-data-driven-forms/src/public-api';
import { MarkdownModule } from 'ngx-markdown';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DDFormsCoreModule,
    DDFormsDefaultsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    CoreModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
