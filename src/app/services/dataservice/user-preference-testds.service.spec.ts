import { TestBed } from '@angular/core/testing';

import { UserPreferenceTestdsService } from './user-preference-testds.service';

describe('UserPreferenceTestdsService', () => {
  let service: UserPreferenceTestdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPreferenceTestdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
