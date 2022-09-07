import { ApplicationRendererRegistryService } from './application-renderer-registry';
import { ErrorRendererRegistryService } from './error-renderer-registry';
import { FieldRendererRegistryService } from './field-renderer-registry';
import { HeadingRendererRegistryService } from './heading-renderer-registry';
import { HintRendererRegistryService } from './hint-renderer-registry';
import { LabelRendererRegistryService } from './label-renderer-registry';
import { NarrativeRendererRegistryService } from './narrative-renderer-registry';
import { PageRendererRegistryService } from './page-renderer-registry';
import { QuestionRendererRegistryService } from './question-renderer-registry';
import { RepeatDataRendererRegistryService } from './repeat-data-renderer-registry';
import { RepeatInputRendererRegistryService } from './repeat-input-renderer-registry';
import { SectionRendererRegistryService } from './section-renderer-registry';
import { SectionRepeatRendererRegistryService } from './section-repeat-renderer-registry';

export const RENDERER_REGISTRY_SERVICES_LIST = [
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
];
