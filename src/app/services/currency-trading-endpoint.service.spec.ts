import { TestBed } from '@angular/core/testing';

import { CurrencyTradingEndpointService } from './currency-trading-endpoint.service';

describe('CurrencyTradingEndpointService', () => {
  let service: CurrencyTradingEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyTradingEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
