import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { AuthService } from '../auth.service';
import { User } from 'src/app/models/user';
import { ResponseEntity } from 'src/app/models/response-entity';
import { SignupService } from '../../services/signup.service';
import { AlertService } from '../../services/alert.service';
import { LoginService } from '../../services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit,OnDestroy {
  maxDate;
  user : User = new User();
  isLoading:boolean;
  private loadingSubs : Subscription;
  constructor(private authService: AuthService,private alertService: AlertService,private signupService :SignupService,private loginService: LoginService, private uiService : UiService ) { }

  ngOnInit() {
    this.authService.setAccessToken = null;;
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.loadingSubs = this.uiService.loadingStageChanged.subscribe(isLoading=>{
      this.isLoading = isLoading;
    });
  }

  onSubmit(form: NgForm) {
    this.user.userName = form.value.email;
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    this.user.birthday = form.value.birthdate;
    this.user.firstName = form.value.firstName;
    this.user.lastName = form.value.lastName;
    this.user.active = "true";
    this.uiService.showProgressBar();
    this.signupService.SignUpUser<ResponseEntity>(this.user).subscribe(
      results => {   
        if(results.statusCodeValue == 400)   
        {
          this.alertService.openSnackBar("user name already exit","Error");
        }
        else{
          this.alertService.openSnackBar("User registered successfully","Done");
          this.authService.registerUser(this.user);
        }
        this.uiService.hideProgressBar();
      }, 
      error => {
        this.alertService.openSnackBar("Unable to save.","Error"); 
        this.uiService.hideProgressBar();
      });

  }

  ngOnDestroy(){
    this.loadingSubs.unsubscribe();
  }

}
