import { Injectable } from '@angular/core';
import { CurrencyTradingEndpointService } from './currency-trading-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTradingService {

  constructor(private currencyTradingEndpointService: CurrencyTradingEndpointService) { }

  getAllCurrency<T>() {    
    return this.currencyTradingEndpointService.getAllCurrencyEndpoint<T>();
  }  
}
