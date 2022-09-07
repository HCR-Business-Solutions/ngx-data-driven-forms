import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DDFormsDefaultConditionsModule } from './conditions/conditions.module';
import { DDFormsDefaultFieldsModule } from './fields/fields.module';
import { DDFormsDefaultRenderersModule } from './renderers/renderers.module';
import { DDFormsDefaultValidatorsModule } from './validators/validators.module';
import { DDFormsDefaultLanguageModule } from './language/language.module';

const SUB_MODULES = [
  DDFormsDefaultRenderersModule,
  DDFormsDefaultFieldsModule,
  DDFormsDefaultValidatorsModule,
  DDFormsDefaultConditionsModule,
  DDFormsDefaultLanguageModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...SUB_MODULES],
  exports: [...SUB_MODULES],
})
export class DDFormsDefaultsModule {}
