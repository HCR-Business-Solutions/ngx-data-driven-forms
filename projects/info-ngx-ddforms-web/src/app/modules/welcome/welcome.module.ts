import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { RootComponent } from './pages/root.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [RootComponent],
  imports: [CommonModule, WelcomeRoutingModule, SharedModule],
})
export class WelcomeModule {}
