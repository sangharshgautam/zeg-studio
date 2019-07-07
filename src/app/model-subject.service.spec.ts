import { TestBed } from '@angular/core/testing';

import { ModelSubjectService } from './model-subject.service';

describe('ModelSubjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelSubjectService = TestBed.get(ModelSubjectService);
    expect(service).toBeTruthy();
  });
});
