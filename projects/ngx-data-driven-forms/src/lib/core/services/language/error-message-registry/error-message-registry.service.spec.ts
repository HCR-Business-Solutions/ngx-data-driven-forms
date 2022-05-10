import { TestBed } from '@angular/core/testing';

import { ErrorMessageRegistryService } from './error-message-registry.service';

describe('ErrorMessageRegistryService', () => {
  let service: ErrorMessageRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMessageRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
