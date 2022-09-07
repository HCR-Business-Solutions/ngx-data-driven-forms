import { TestBed } from '@angular/core/testing';

import { RepeatInputRendererRegistryService } from './repeat-input-renderer-registry.service';

describe('RepeatInputRendererRegistryService', () => {
  let service: RepeatInputRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepeatInputRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
