import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './components/logo.component';
import { OutlineSectionComponent } from './components/outline-section.component';

@NgModule({
  declarations: [LogoComponent, OutlineSectionComponent],
  imports: [CommonModule],
  exports: [LogoComponent, OutlineSectionComponent],
})
export class SharedModule {}
