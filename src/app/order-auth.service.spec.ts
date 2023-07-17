import { TestBed } from '@angular/core/testing';

import { OrderAuthService } from './order-auth.service';

describe('OrderAuthService', () => {
  let service: OrderAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
