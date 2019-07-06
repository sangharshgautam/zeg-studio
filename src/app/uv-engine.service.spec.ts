import { TestBed } from '@angular/core/testing';

import { UvEngineService } from './uv-engine.service';

describe('UvEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UvEngineService = TestBed.get(UvEngineService);
    expect(service).toBeTruthy();
  });
});
