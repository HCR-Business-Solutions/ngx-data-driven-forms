import { LANGUAGE_REGISTRY_SERVICES_LIST } from './language/list';
import { LOGIC_REGISTRY_SERVICES_LIST } from './logic';
import { MasterReigistryService } from './master-reigistry';
import { RENDERER_REGISTRY_SERVICES_LIST } from './renderer';

export const REGISTRY_SERVICES_LIST = [
  ...LANGUAGE_REGISTRY_SERVICES_LIST,
  ...LOGIC_REGISTRY_SERVICES_LIST,
  ...RENDERER_REGISTRY_SERVICES_LIST,
  MasterReigistryService,
];
