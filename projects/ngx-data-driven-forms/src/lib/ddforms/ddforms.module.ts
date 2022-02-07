import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DDFormsComponentsModule } from '../ddforms-components';
import { DefaultFieldComponentsModule } from '../default-field-components';
import { SharedModule } from '../shared';
import { IDefaultValues, IModuleConfig } from './interfaces';
import { DEFAULT_FIELD_COMPONENT_MAP } from '../default-field-components/maps/default-components.map';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DDFormsComponentsModule,
    DefaultFieldComponentsModule,
    SharedModule,
  ],
  exports: [
    DDFormsComponentsModule,
    DefaultFieldComponentsModule,
    SharedModule,
  ]
})
export class DDFormsModule {

  static forRoot(config: IModuleConfig): ModuleWithProviders<DDFormsModule> {

    const defaults: IDefaultValues = {
      components: !config.skipDefaults?.components ? DEFAULT_FIELD_COMPONENT_MAP : undefined,
    };

    return {
      ngModule: DDFormsModule,
      providers: [
        {
          provide: 'moduleConfig',
          useValue: config
        },
        {
          provide: 'defaults',
          useValue: defaults,
        }
      ]
    }
  }

}
