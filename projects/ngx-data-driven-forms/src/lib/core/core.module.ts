import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SERVICES_LIST } from './services';
import { COMPONENTS_LIST } from './components';
import { DIRECTIVE_LIST } from './directives';

@NgModule({
  declarations: [...DIRECTIVE_LIST, ...COMPONENTS_LIST],
  imports: [CommonModule],
  exports: [...COMPONENTS_LIST, ...COMPONENTS_LIST],
  providers: [...SERVICES_LIST],
})
export class DDFormsCoreModule {}
