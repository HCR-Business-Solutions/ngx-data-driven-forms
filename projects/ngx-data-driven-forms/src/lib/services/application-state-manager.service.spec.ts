import { TestBed } from '@angular/core/testing';

import { ApplicationStateManagerService } from './application-state-manager.service';

describe('ApplicationStateManagerService', () => {
  let service: ApplicationStateManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationStateManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
