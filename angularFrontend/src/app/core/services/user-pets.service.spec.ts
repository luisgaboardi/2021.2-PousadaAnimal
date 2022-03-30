import { TestBed } from '@angular/core/testing';

import { UserPetsService } from './user-pets.service';

describe('UserPetsService', () => {
  let service: UserPetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
