import { TestBed } from '@angular/core/testing';

import { SectionRepeatRendererRegistryService } from './section-repeat-renderer-registry.service';

describe('SectionRepeatRendererRegistryService', () => {
  let service: SectionRepeatRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionRepeatRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
