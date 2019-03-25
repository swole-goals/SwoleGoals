import { TestBed } from '@angular/core/testing';

import { ExerciseTableService } from './exercise-table.service';

describe('ExerciseTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExerciseTableService = TestBed.get(ExerciseTableService);
    expect(service).toBeTruthy();
  });
});
