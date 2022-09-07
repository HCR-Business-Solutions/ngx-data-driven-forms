import { TestBed } from '@angular/core/testing';

import { LabelRendererRegistryService } from './label-renderer-registry.service';

describe('LabelRendererRegistryService', () => {
  let service: LabelRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
