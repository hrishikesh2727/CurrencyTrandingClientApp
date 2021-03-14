import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EndpointBase {

  private taskPauser: Subject<any>;
  private isRefreshingLogin: boolean;

  constructor(
    protected http: HttpClient,
    private authService: AuthService) {

  }

  protected get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.authService.accessToken,
      'Content-Type': 'application/json'//,
      //Accept: 'application/json, text/plain, */*'
    });

    return { headers };
  }

  protected get requestHeadersForCors(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({

    });
    headers.append('Access-Control-Allow-Origin', '*');
    return { headers };
  }

  protected get loginRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    });

    return { headers };
  }

  protected handleError(error, continuation: () => Observable<any>) {
    if (error.error && error.error.error == 'invalid_grant') {
      this.authService.logout();

      return throwError((error.error && error.error.error_description) ? `session expired (${error.error.error_description})` : 'session expired');
    } else {
      return throwError(error);
    }
    };

}
