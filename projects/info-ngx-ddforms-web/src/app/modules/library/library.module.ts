import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { AboutMainComponent } from './pages/about-main/about-main.component';

@NgModule({
  declarations: [
    AboutMainComponent
  ],
  imports: [CommonModule, LibraryRoutingModule],
})
export class LibraryModule {}
