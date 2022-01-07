import { TestBed } from '@angular/core/testing';

import { DataDrivenFormsConfigService } from './data-driven-forms-config.service';

describe('DataDrivenFormsConfigService', () => {
  let service: DataDrivenFormsConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDrivenFormsConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
