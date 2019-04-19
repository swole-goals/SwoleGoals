import { TestBed } from '@angular/core/testing';

import { SetGroupChallengeService } from './set-group-challenge.service';

describe('SetGroupChallengeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetGroupChallengeService = TestBed.get(SetGroupChallengeService);
    expect(service).toBeTruthy();
  });
});
