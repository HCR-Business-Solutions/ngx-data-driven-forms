import { TestBed } from '@angular/core/testing';

import { HintRendererRegistryService } from './hint-renderer-registry.service';

describe('HintRendererRegistryService', () => {
  let service: HintRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HintRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
