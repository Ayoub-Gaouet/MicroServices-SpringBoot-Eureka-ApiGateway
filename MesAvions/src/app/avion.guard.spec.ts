import { TestBed } from '@angular/core/testing';

import { AvionGuard } from './avion.guard';

describe('AvionGuard', () => {
  let guard: AvionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AvionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
