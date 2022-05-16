import { TestBed } from '@angular/core/testing';

import { RepeatDataRendererRegistryService } from './repeat-data-renderer-registry.service';

describe('RepeatDataRendererRegistryService', () => {
  let service: RepeatDataRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepeatDataRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
