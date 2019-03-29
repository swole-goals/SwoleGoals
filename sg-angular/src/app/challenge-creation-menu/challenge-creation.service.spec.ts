import { TestBed } from '@angular/core/testing';

import { ChallengeCreationService } from './challenge-creation.service';

describe('ChallengeCreationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChallengeCreationService = TestBed.get(ChallengeCreationService);
    expect(service).toBeTruthy();
  });
});
