import { TestBed } from '@angular/core/testing';

import { ErrorRendererRegistryService } from './error-renderer-registry.service';

describe('ErrorRendererRegistryService', () => {
  let service: ErrorRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
