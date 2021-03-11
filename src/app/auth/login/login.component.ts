import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JwtToken } from 'src/app/models/jwttoken';
import { User } from 'src/app/models/user';

import { AuthService } from '../auth.service';
import { LoginService } from '../../services/login.service';
import { AlertService } from 'src/app/services/alert.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginSubmitError: string;
  loginForm: FormGroup;
  user: User = new User();
  private loadingSubs : Subscription;
  isLoading:boolean;
  constructor(private loginService: LoginService, private alertService: AlertService, private authService:AuthService, private uiService : UiService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });

    this.loadingSubs = this.uiService.loadingStageChanged.subscribe(isLoading=>{
      this.isLoading = isLoading;
    });
  }

  onSubmit() {

    this.user.userName = this.loginForm.value.email;
    this.user.password = this.loginForm.value.password;
    this.uiService.showProgressBar();
    this.loginService.loginValidation<JwtToken>(this.user).subscribe(
      results => {
        sessionStorage.setItem('currency-trading:username', this.user.userName);
        sessionStorage.setItem('currency-trading:token', results.jwt);
        this.alertService.openSnackBar("log in successfully.", "Done");
        this.authService.login(this.user);
        this.uiService.hideProgressBar();
      },
      error => {
        this.uiService.loadingStageChanged.next(false);
        this.alertService.openSnackBar("User login failed.", "Error");
      }
    );
  }

  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }
}
