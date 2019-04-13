import { TestBed } from '@angular/core/testing';

import { ExerciseCurrentService } from './exercise-current.service';

describe('ExerciseCurrentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseCurrentService = TestBed.get(ExerciseCurrentService);
    expect(service).toBeTruthy();
  });
});
