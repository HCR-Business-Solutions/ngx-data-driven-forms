import { TestBed } from '@angular/core/testing';

import { FieldRendererRegistryService } from './field-renderer-registry.service';

describe('FieldRendererRegistryService', () => {
  let service: FieldRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FieldRendererRegistryService],
    });
    service = TestBed.inject(FieldRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
