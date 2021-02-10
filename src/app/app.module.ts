import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { LoginService } from './auth/login/login.service';
import { LoginEndpointService } from './auth/login/login-endpoint.service';
import { EndpointBase } from './services/endpoint-base.service';
import { ConfigurationService } from './services/UserConfiguration.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,
    LoginService,
  LoginEndpointService,
EndpointBase,
ConfigurationService ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
