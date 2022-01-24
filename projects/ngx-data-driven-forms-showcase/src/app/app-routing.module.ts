import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ApplicationExampleComponent } from './pages/application-example/application-example.component';
import { TestingComponent } from './pages/testing/testing.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TestingComponent,
  },
  {
    path: 'application',
    component: ApplicationExampleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
