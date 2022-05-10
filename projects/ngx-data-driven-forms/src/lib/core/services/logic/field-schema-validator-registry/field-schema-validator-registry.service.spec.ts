import { TestBed } from '@angular/core/testing';

import { FieldSchemaValidatorRegistryService } from './field-schema-validator-registry.service';

describe('FieldSchemaValidatorRegistryService', () => {
  let service: FieldSchemaValidatorRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldSchemaValidatorRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
