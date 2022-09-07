import { TestBed } from '@angular/core/testing';

import { SectionRendererRegistryService } from './section-renderer-registry.service';

describe('SectionRendererRegistryService', () => {
  let service: SectionRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
