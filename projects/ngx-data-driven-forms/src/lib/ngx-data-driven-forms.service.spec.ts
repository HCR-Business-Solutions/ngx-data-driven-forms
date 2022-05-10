import { TestBed } from '@angular/core/testing';

import { NgxDataDrivenFormsService } from './ngx-data-driven-forms.service';

describe('NgxDataDrivenFormsService', () => {
  let service: NgxDataDrivenFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDataDrivenFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
