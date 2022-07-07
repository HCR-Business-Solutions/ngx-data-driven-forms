import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, WelcomeRoutingModule, SharedModule],
})
export class WelcomeModule {}
