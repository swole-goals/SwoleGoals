import { TestBed } from '@angular/core/testing';

import { GetUsersService } from './get-users.service';

describe('GetUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetUsersService = TestBed.get(GetUsersService);
    expect(service).toBeTruthy();
  });
});
