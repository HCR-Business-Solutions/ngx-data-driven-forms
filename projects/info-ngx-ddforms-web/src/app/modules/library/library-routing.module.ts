import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepeatComponent } from './pages/repeat';
import { RootComponent } from './pages/root';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RootComponent,
  },
  {
    path: 'repeat',
    component: RepeatComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibraryRoutingModule {}
