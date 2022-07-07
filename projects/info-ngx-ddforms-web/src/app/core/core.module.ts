import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [ToolbarComponent],
})
export class CoreModule {}
