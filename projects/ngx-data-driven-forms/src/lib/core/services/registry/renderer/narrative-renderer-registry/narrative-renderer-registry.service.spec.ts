import { TestBed } from '@angular/core/testing';

import { NarrativeRendererRegistryService } from './narrative-renderer-registry.service';

describe('NarrativeRendererRegistryService', () => {
  let service: NarrativeRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NarrativeRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
