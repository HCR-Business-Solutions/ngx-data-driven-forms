import { TestBed } from '@angular/core/testing';

import { QuestionRendererRegistryService } from './question-renderer-registry.service';

describe('QuestionRendererRegistryService', () => {
  let service: QuestionRendererRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionRendererRegistryService],
    });
    service = TestBed.inject(QuestionRendererRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
