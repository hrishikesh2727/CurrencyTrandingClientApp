import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


import { AuthData } from './auth-data.model';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User = new User();

  constructor(private router: Router) {}

  registerUser() {    
    this.authSuccessfully();
  }

  
  login(authData: AuthData) {    
    this.user = {
      email: authData.email,
      active: null,
      birthday: null,
      firstName: null,
      lastName: null,
      password: null,
      userName : authData.email
    };
    this.authSuccessfully();
  }

  logout() {
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != null;
  }

  get accessToken(): string {    
    return sessionStorage.getItem('currency-trading:token');
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/currency-trading']);
  }
}
