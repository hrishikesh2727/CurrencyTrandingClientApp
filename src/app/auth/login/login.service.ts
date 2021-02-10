import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { CurrencyApi, JwtToken } from 'src/app/models/JwtToken';
import { LoginEndpointService } from './login-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private loginEndpoint: LoginEndpointService) { }

  loginValidation<T>(user : User) {
    var jwtToken = this.loginEndpoint.getValidUserTokenEndpoint<T>(user);
    return jwtToken;
  }  
}
