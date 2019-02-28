import { TestBed } from '@angular/core/testing';

import { ExerciseListService } from './exercise-list.service';

describe('ExerciseListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseListService = TestBed.get(ExerciseListService);
    expect(service).toBeTruthy();
  });
});
