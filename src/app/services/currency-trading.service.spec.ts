import { TestBed } from '@angular/core/testing';

import { CurrencyTradingService } from './currency-trading.service';

describe('CurrencyTradingService', () => {
  let service: CurrencyTradingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyTradingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
