import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDataDrivenFormsModule} from '../../../ngx-data-driven-forms/src/lib';
import { ApplicationExampleComponent } from './pages/application-example/application-example.component';
import { TestingComponent } from './pages/testing/testing.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplicationExampleComponent,
    TestingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxDataDrivenFormsModule.forRoot(),
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
