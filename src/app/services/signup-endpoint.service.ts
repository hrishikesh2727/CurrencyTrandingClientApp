import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { EndpointBase } from './endpoint-base.service';
import { ConfigurationService } from './UserConfiguration.service';

@Injectable({
  providedIn: 'root'
})
export class SignupEndpointService extends EndpointBase  {
  private readonly _signUpUrl: string = '/signup';
  private readonly _resetPasswordUrl: string = '/resetPassword';

  get signUpUrl() { return this.configurations.baseUrl + this._signUpUrl; }

  get resetPasswordUrl() { return this.configurations.baseUrl + this._resetPasswordUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) { 
    super(http, authService);
  }
  
  signUpEndpoint<T>(user: User): Observable<T> { 
    return this.http.post<T>(this.signUpUrl, JSON.stringify(user), this.loginRequestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.signUpEndpoint(user));        
      }));
  }

  resetPasswordEndpoint<T>(user: User): Observable<T> { 
    return this.http.post<T>(this.resetPasswordUrl, JSON.stringify(user), this.loginRequestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.resetPasswordEndpoint(user));        
      }));
  }
}