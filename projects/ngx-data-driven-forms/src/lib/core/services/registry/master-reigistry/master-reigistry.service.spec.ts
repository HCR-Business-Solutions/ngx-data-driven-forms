import { TestBed } from '@angular/core/testing';

import { MasterReigistryService } from './master-reigistry.service';

describe('MasterReigistryService', () => {
  let service: MasterReigistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterReigistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
