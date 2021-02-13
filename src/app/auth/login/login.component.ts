import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtToken } from 'src/app/models/JwtToken';
import { User } from 'src/app/models/user';

import { AuthService } from '../auth.service';
import {LoginService} from '../login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSubmitError:string;
  loginForm: FormGroup;
  user : User = new User();
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {

    this.user.username = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    this.loginService.loginValidation<JwtToken>(this.user).subscribe(
      results => {
      sessionStorage.setItem('username',this.user.username);
         let tokenStr= 'Bearer '+results.jwt;
         sessionStorage.setItem('token', tokenStr);
         this.loginSubmitError = "log in successfully.";
         
      }
      , 
      error => {
      this.loginSubmitError = "User login failed.";
      }
      );
  }
}
