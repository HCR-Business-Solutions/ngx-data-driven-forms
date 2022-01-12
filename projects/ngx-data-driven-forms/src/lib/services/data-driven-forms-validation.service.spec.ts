import {TestBed} from '@angular/core/testing';

import {DataDrivenFormsValidationService} from './data-driven-forms-validation.service';

describe('DataDrivenFormsService', () => {
  let service: DataDrivenFormsValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDrivenFormsValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
