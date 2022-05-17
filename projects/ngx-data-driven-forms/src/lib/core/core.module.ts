import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SERVICES_LIST } from './services';
import { COMPONENTS_LIST } from './components';
import { DIRECTIVE_LIST } from './directives';

@NgModule({
  declarations: [...COMPONENTS_LIST, ...DIRECTIVE_LIST],
  imports: [CommonModule],
  exports: [...COMPONENTS_LIST, ...DIRECTIVE_LIST],
  providers: [...SERVICES_LIST],
})
export class DDFormsCoreModule {}
