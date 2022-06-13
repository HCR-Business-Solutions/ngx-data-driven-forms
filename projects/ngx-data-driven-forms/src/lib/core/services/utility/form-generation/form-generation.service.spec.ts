import { TestBed } from '@angular/core/testing';

import { FormGenerationService } from './form-generation.service';

describe('FormGenerationService', () => {
  let service: FormGenerationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormGenerationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
