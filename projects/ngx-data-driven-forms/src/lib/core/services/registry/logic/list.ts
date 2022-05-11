import { ConditionsRegistryService } from './conditions-registry';
import { CrossFieldValidatorRegistryService } from './cross-field-validator-registry';
import { FieldSchemaValidatorRegistryService } from './field-schema-validator-registry';
import { FieldValidatorRegistryService } from './field-validator-registry';

export const LOGIC_REGISTRY_SERVICES_LIST = [
  ConditionsRegistryService,
  CrossFieldValidatorRegistryService,
  FieldSchemaValidatorRegistryService,
  FieldValidatorRegistryService,
];
