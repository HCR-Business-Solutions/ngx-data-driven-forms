import { Injectable } from '@angular/core';
import { ErrorMessageRegistryService } from '../language';
import {
  ConditionsRegistryService,
  CrossFieldValidatorRegistryService,
  FieldSchemaValidatorRegistryService,
  FieldValidatorRegistryService,
} from '../logic';
import {
  ApplicationRendererRegistryService,
  ErrorRendererRegistryService,
  FieldRendererRegistryService,
  HeadingRendererRegistryService,
  HintRendererRegistryService,
  LabelRendererRegistryService,
  NarrativeRendererRegistryService,
  PageRendererRegistryService,
  QuestionRendererRegistryService,
  RepeatDataRendererRegistryService,
  RepeatInputRendererRegistryService,
  SectionRendererRegistryService,
  SectionRepeatRendererRegistryService,
} from '../renderer';

@Injectable()
export class MasterReigistryService {
  constructor(
    // Language Registries
    public _errorMessageRegistry: ErrorMessageRegistryService,
    /* -***- */
    // Logic Registries
    public _conditionsRegistry: ConditionsRegistryService,
    public _crossFieldValidatorRegistry: CrossFieldValidatorRegistryService,
    public _fieldSchemaValidatorRegistry: FieldSchemaValidatorRegistryService,
    public _fieldValidatorRegistry: FieldValidatorRegistryService,
    /* -***- */
    // Renderer Registries
    public _applicationRendererRegistry: ApplicationRendererRegistryService,
    public _errorRendererRegistry: ErrorRendererRegistryService,
    public _fieldRendererRegistry: FieldRendererRegistryService,
    public _headingRendererRegistry: HeadingRendererRegistryService,
    public _hintRendererRegistry: HintRendererRegistryService,
    public _labelRendererRegistry: LabelRendererRegistryService,
    public _narrativeRendererRegistry: NarrativeRendererRegistryService,
    public _pageRendererRegistry: PageRendererRegistryService,
    public _questionRendererRegistry: QuestionRendererRegistryService,
    public _repeatDataRendererRegistry: RepeatDataRendererRegistryService,
    public _repeatInputRendererRegistry: RepeatInputRendererRegistryService,
    public _sectionRendererRegistry: SectionRendererRegistryService,
    public _sectionRepeatRendererRegistry: SectionRepeatRendererRegistryService
  ) {}
}
