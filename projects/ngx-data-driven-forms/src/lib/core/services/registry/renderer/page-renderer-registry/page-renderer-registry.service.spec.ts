import { TestBed } from '@angular/core/testing';

import { PageRendererRegistryService } from './page-renderer-registry.service';

describe('PageRendererRegistryService', () => {
  let service: PageRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
