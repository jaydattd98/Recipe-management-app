import { TestBed } from '@angular/core/testing';

import { RecipeDatabaseService } from './recipe-database.service';

describe('RecipeDatabaseService', () => {
  let service: RecipeDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
