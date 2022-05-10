import { TestBed } from '@angular/core/testing';

import { FieldValidatorRegistryService } from './field-validator-registry.service';

describe('FieldValidatorRegistryService', () => {
  let service: FieldValidatorRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieldValidatorRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
