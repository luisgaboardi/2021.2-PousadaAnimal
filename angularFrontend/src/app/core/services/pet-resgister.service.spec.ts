import { TestBed } from '@angular/core/testing';

import { PetResgisterService } from './pet-register.service';

describe('PetResgisterService', () => {
  let service: PetResgisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetResgisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
