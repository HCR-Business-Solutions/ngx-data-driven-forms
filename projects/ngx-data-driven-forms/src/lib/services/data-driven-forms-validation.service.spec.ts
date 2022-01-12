import {TestBed} from '@angular/core/testing';

import {DataDrivenFormsService} from './data-driven-forms-validation.service';

describe('DataDrivenFormsService', () => {
  let service: DataDrivenFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDrivenFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
