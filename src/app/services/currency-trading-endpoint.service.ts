import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { OrderBook } from '../models/order-book';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './UserConfiguration.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTradingEndpointService extends EndpointBase {
  private readonly _getLiveAllCurrencyUrl:string ='https://openexchangerates.org/api/currencies.json';
  private readonly _getAllCurrencyUrl: string = '/getAllCurrency';
  private readonly _addOrderBookUrl: string = '/addOrderBook';
  private readonly _getOrderBookUrl: string = '/getAllOrderBook';

  get getLiveAllCurrencyUrl() { return this.configurations.baseUrl + this._getLiveAllCurrencyUrl; }
  get getAllCurrencyUrl() { return this.configurations.baseUrl + this._getAllCurrencyUrl; }
  get addOrderBookUrl() { return this.configurations.baseUrl + this._addOrderBookUrl; }
  get getOrderBookUrl() { return this.configurations.baseUrl + this._getOrderBookUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) { 
    super(http, authService);
  }
  
  getAllCurrencyEndpoint<T>(): Observable<T> { 
    return this.http.get<T>(this.getAllCurrencyUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAllCurrencyEndpoint());        
      }));
  }

  getLiveAllCurrencyEndpoint<T>(): Observable<T> { 
    return this.http.get<T>(this._getLiveAllCurrencyUrl).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getLiveAllCurrencyEndpoint());        
      }));
  }

  addOrderBookEndpoint<T>(orderBook: OrderBook): Observable<T> { 
    return this.http.post<T>(this.addOrderBookUrl,JSON.stringify(orderBook), this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.addOrderBookEndpoint(orderBook));        
      }));
  }

  getOrderBookEndpoint<T>(): Observable<T> { 
    return this.http.get<T>(this.getOrderBookUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getOrderBookEndpoint());        
      }));
  }

}
