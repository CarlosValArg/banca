import { TestBed } from '@angular/core/testing';

import { BuyCurrencyService } from './buy-currency.service';

describe('BuyCurrencyService', () => {
  let service: BuyCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
