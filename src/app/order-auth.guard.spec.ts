import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { orderAuthGuard } from './order-auth.guard';

describe('orderAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => orderAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
