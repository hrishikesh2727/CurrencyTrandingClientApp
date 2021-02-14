import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './UserConfiguration.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTradingEndpointService extends EndpointBase {
  private readonly _getAllCurrencyUrl: string = '/getAllCurrency';

  get getAllCurrencyUrl() { return this.configurations.baseUrl + this._getAllCurrencyUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) { 
    super(http, authService);
  }
  
  getAllCurrencyEndpoint<T>(): Observable<T> { 
    return this.http.get<T>(this.getAllCurrencyUrl, this.requestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getAllCurrencyEndpoint());        
      }));
  }

}
