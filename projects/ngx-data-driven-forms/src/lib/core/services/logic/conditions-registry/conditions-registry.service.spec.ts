import { TestBed } from '@angular/core/testing';

import { ConditionsRegistryService } from './conditions-registry.service';

describe('ConditionsRegistryService', () => {
  let service: ConditionsRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConditionsRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
