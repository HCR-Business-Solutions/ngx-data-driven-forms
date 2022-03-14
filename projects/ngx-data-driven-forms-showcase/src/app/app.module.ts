import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DDFormsModule } from '../../../ngx-data-driven-forms/src/lib/ddforms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationExampleComponent } from './pages/application-example/application-example.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DDFormsModule.forRoot({
      // skipDefaultStyles: true
    }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
