import { TestBed } from '@angular/core/testing';

import { ExerciseResultService } from './exercise-result.service';

describe('ExerciseResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseResultService = TestBed.get(ExerciseResultService);
    expect(service).toBeTruthy();
  });
});
