import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ApplicationExampleComponent} from './pages/application-example/application-example.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationExampleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
