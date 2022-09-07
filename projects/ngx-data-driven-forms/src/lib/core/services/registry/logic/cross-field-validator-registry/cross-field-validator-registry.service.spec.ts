import { TestBed } from '@angular/core/testing';

import { CrossFieldValidatorRegistryService } from './cross-field-validator-registry.service';

describe('CrossFieldValidatorRegistryService', () => {
  let service: CrossFieldValidatorRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrossFieldValidatorRegistryService],
    });
    service = TestBed.inject(CrossFieldValidatorRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
