import { Injectable } from '@angular/core';
import { OrderBook } from '../models/order-book';
import { CurrencyTradingEndpointService } from './currency-trading-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTradingService {

  constructor(private currencyTradingEndpointService: CurrencyTradingEndpointService) { }

  getAllCurrency<T>() {    
    return this.currencyTradingEndpointService.getAllCurrencyEndpoint<T>();
  }  

  addOrderBook<T>(orderBook: OrderBook) {    
    return this.currencyTradingEndpointService.addOrderBookEndpoint<T>(orderBook);
  }  

  getOrderBook<T>() {    
    return this.currencyTradingEndpointService.getOrderBookEndpoint<T>();
  } 
}
