import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { SignupEndpointService } from './signup-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private signupEndpointService:SignupEndpointService) { }
  
  SignUpUser<T>(user : User) {    
    return this.signupEndpointService.signUpEndpoint<T>(user);
  }  
}
