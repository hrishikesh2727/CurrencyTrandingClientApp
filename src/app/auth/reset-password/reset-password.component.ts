import { Component, OnInit } from '@angular/core';
import { ResetPassword } from 'src/app/models/reset-password';
import { MyErrorStateMatcher } from 'src/app/models/my-error-state-matcher';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { ResponseEntity } from 'src/app/models/response-entity';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  resetPassword: ResetPassword = new ResetPassword();
  userObj: User = new User();
  matcher = new MyErrorStateMatcher();
  constructor(private signupService: SignupService, private alertService: AlertService, private authService: AuthService) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.checkPasswords });

  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true }
  }

  onSubmit() {   
    this.userObj.userName = this.resetPasswordForm.value.email;
    this.userObj.password = this.resetPasswordForm.value.password;
    this.signupService.resetUserPassword<ResponseEntity>(this.userObj).subscribe(
      results => {   
        if(results.statusCodeValue == 400)   
        {
          this.alertService.openSnackBar(results.body,"Error");
        }
        else{
          this.alertService.openSnackBar("Password updated successfully","Done");
          this.authService.registerUser(this.userObj);
        }
      }, 
      error => {
        this.alertService.openSnackBar("Unable to save.","Error"); 
      });
  }

}
