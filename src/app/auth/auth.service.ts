import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


import { AuthData } from './auth-data.model';
import { User } from '../models/user';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User = new User();

  constructor(private router: Router) { }

  registerUser(user: User) {
    this.logout();
  }


  login(user: User) {    
    this.user = user;
    this.authSuccessfully();
  }

  logout() {    
    this.setAccessToken = null;
    this.user = null;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    if(this.user != null && this.user != undefined){
      if(this.user.userName == undefined){
        this.user = null;
      }
    }
    return this.user != null && this.user != undefined;
  }

  get accessToken(): string {
    return sessionStorage.getItem('currency-trading:token');
  }

  set setAccessToken(tokenValue : any) {
     sessionStorage.setItem('currency-trading:token',tokenValue);
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/']);
  }
}
