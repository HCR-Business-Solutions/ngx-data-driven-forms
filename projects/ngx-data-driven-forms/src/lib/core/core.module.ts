import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderFieldBaseComponent } from './components/render-field-base/render-field-base.component';
import { RenderQuestionBaseComponent } from './components/render-question-base/render-question-base.component';
import { RenderFieldDirective } from './directives/render-field/render-field.directive';
import * as Services from './services';

@NgModule({
  declarations: [
    RenderFieldBaseComponent,
    RenderQuestionBaseComponent,
    RenderFieldDirective,
  ],
  imports: [CommonModule],
  providers: [
    Services.ConditionsRegistryService,
    Services.CrossFieldValidatorRegistryService,
    Services.ErrorMessageRegistryService,
    Services.FieldRendererRegistryService,
    Services.FieldSchemaValidatorRegistryService,
    Services.FieldValidatorRegistryService,
  ],
})
export class CoreModule {}
