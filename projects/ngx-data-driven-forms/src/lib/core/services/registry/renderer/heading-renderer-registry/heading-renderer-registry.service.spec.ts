import { TestBed } from '@angular/core/testing';

import { HeadingRendererRegistryService } from './heading-renderer-registry.service';

describe('HeadingRendererRegistryService', () => {
  let service: HeadingRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeadingRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
