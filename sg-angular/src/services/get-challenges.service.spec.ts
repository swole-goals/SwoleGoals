import { TestBed } from '@angular/core/testing';

import { GetChallengesService } from './get-challenges.service';

describe('GetChallengesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetChallengesService = TestBed.get(GetChallengesService);
    expect(service).toBeTruthy();
  });
});
