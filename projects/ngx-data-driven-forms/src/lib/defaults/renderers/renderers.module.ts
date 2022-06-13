import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DDFormsCoreModule, MasterReigistryService } from '../../core';
import * as DefaultComponents from './components';
import { DEFAULT_COMPONTENTS } from './components/list';

@NgModule({
  declarations: [...DEFAULT_COMPONTENTS],
  imports: [CommonModule, DDFormsCoreModule],
  exports: [...DEFAULT_COMPONTENTS],
})
export class DDFormsDefaultRenderersModule {
  constructor(private _masterRegistry: MasterReigistryService) {
    // #region View Organization Renderers
    this._masterRegistry._applicationRendererRegistry.register(
      'default',
      DefaultComponents.ApplicationDefaultComponent
    );
    this._masterRegistry._pageRendererRegistry.register(
      'default',
      DefaultComponents.PageDefaultComponent
    );
    this._masterRegistry._sectionRendererRegistry.register(
      'default',
      DefaultComponents.SectionDefaultComponent
    );
    this._masterRegistry._sectionRepeatRendererRegistry.register(
      'default',
      DefaultComponents.SectionRepeatDefaultComponent
    );
    this._masterRegistry._questionRendererRegistry.register(
      'default',
      DefaultComponents.QuestionDefaultComponent
    );
    // #endregion View Organization Renderers

    // #region Question Compisition Renderers
    this._masterRegistry._labelRendererRegistry.register(
      'default',
      DefaultComponents.LabelDefaultComponent
    );
    this._masterRegistry._hintRendererRegistry.register(
      'default',
      DefaultComponents.HintDefaultComponent
    );
    this._masterRegistry._errorRendererRegistry.register(
      'default',
      DefaultComponents.ErrorDefaultComponent
    );
    //#endregion Question Compisition Renderers
  }
}
