import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DDFormsComponentsModule} from '../ddforms-components';
import {DefaultFieldComponentsModule} from '../default-field-components';
import {SharedModule} from '../shared';
import {IDefaultValues, IModuleConfig} from './interfaces';
import {
  DEFAULT_CONDITIONS_MAP,
  DEFAULT_CROSS_FIELD_VALIDATOR_MAP,
  DEFAULT_DATA_HANDLER_MAP,
  DEFAULT_MESSAGE_HANDLER_MAP,
  DEFAULT_VALIDATOR_MAP
} from './defaults';
import {DEFAULT_FIELD_COMPONENT_MAP, DEFAULT_FIELD_CONFIG_MAP} from '../default-field-components/maps';
import {FormContainerComponent} from './components/form-container/form-container.component';
import {LinearNavigatorComponent} from './components/linear-navigator/linear-navigator.component';
import {NonLinearNavigatorComponent} from './components/non-linear-navigator/non-linear-navigator.component';
import {ChangesModalComponent} from './components/changes-modal/changes-modal.component';
import {MarkdownModule} from 'ngx-markdown';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [
    FormContainerComponent,
    LinearNavigatorComponent,
    NonLinearNavigatorComponent,
    ChangesModalComponent,
  ],
  imports: [
    CommonModule,
    DDFormsComponentsModule,
    DefaultFieldComponentsModule,
    MarkdownModule.forRoot(),
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  exports: [
    DDFormsComponentsModule,
    DefaultFieldComponentsModule,
    SharedModule,
    FormContainerComponent,
    LinearNavigatorComponent,
    NonLinearNavigatorComponent,
  ]
})
export class DDFormsModule {

  static forRoot(config: IModuleConfig): ModuleWithProviders<DDFormsModule> {

    const defaults: IDefaultValues = {
      components: !config.skipDefaults?.components ? DEFAULT_FIELD_COMPONENT_MAP : undefined,
      conditions: !config.skipDefaults?.conditions ? DEFAULT_CONDITIONS_MAP : undefined,
      crossFieldValidators: !config.skipDefaults?.crossFieldValidators ? DEFAULT_CROSS_FIELD_VALIDATOR_MAP : undefined,
      dataHandlers: !config.skipDefaults?.dataHandlers ? DEFAULT_DATA_HANDLER_MAP : undefined,
      fieldConfigValidators: !config.skipDefaults?.fieldConfigValidators ? DEFAULT_FIELD_CONFIG_MAP : undefined,
      messageHandlers: !config.skipDefaults?.messageHandlers ? DEFAULT_MESSAGE_HANDLER_MAP : undefined,
      validators: !config.skipDefaults?.validators ? DEFAULT_VALIDATOR_MAP : undefined,
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
    };
  };

}
