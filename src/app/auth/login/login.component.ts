import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtToken } from 'src/app/models/JwtToken';
import { User } from 'src/app/models/user';

import { AuthService } from '../auth.service';
import { LoginService } from '../../services/login.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginSubmitError: string;
  loginForm: FormGroup;
  user: User = new User();
  constructor(private loginService: LoginService, private alertService: AlertService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {

    this.user.userName = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    this.loginService.loginValidation<JwtToken>(this.user).subscribe(
      results => {
        sessionStorage.setItem('currency-trading:username', this.user.userName);
        sessionStorage.setItem('currency-trading:token', results.jwt);
        this.alertService.openSnackBar("log in successfully.", "Done");
      },
      error => {
        this.alertService.openSnackBar("User login failed.", "Error");
      }
    );
  }
}
