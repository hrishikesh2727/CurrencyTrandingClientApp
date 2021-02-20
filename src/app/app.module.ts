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
import { EndpointBase } from './services/endpoint-base.service';
import { ConfigurationService } from './services/UserConfiguration.service';
import { LoginService } from './services/login.service';
import { LoginEndpointService } from './services/login-endpoint.service';
import { SignupService } from './services/signup.service';
import { SignupEndpointService } from './services/signup-endpoint.service';
import { HttpClientModule } from '@angular/common/http';
import { AlertService } from './services/alert.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyTradingComponent } from './currency-trading/currency-trading.component';
import { FooterComponent } from '../app/navigation/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    CurrencyTradingComponent,
    FooterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    LoginService,
    LoginEndpointService,
    SignupService,
    SignupEndpointService,
    EndpointBase,
    ConfigurationService,
    AlertService
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
