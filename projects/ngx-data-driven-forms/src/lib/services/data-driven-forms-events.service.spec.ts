import { TestBed } from '@angular/core/testing';

import { DataDrivenFormsEventsService } from './data-driven-forms-events.service';

describe('DataDrivenFormsEventsService', () => {
  let service: DataDrivenFormsEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDrivenFormsEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
