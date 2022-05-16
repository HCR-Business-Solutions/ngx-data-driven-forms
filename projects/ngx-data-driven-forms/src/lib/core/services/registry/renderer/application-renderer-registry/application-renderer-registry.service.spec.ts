import { TestBed } from '@angular/core/testing';

import { ApplicationRendererRegistryService } from './application-renderer-registry.service';

describe('ApplicationRendererRegistryService', () => {
  let service: ApplicationRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
