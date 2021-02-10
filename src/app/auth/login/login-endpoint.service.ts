import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from 'src/app/models/user';

import { EndpointBase } from 'src/app/services/endpoint-base.service';
import { ConfigurationService } from 'src/app/services/UserConfiguration.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginEndpointService extends EndpointBase  {
  private readonly _getValidUserUrl: string = '/authenticate';

  get getValidUserUrl() { return this.configurations.baseUrl + this._getValidUserUrl; }

  constructor(private configurations: ConfigurationService, http: HttpClient, authService: AuthService) { 
    super(http, authService);
  }
  
  getValidUserTokenEndpoint<T>(user: User): Observable<T> { 
    let username = user.username;
    let password = user.password; 
    return this.http.post<T>(this.getValidUserUrl, {username,password}, this.loginRequestHeaders).pipe<T>(
      catchError(error => {
        return this.handleError(error, () => this.getValidUserTokenEndpoint(user));
        
      }));
  }
}
