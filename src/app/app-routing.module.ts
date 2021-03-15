import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CurrencyTradingComponent } from './currency-trading/currency-trading.component';
import { ExchangeChartComponent } from './exchange-chart/exchange-chart.component'
import { CompareChartComponent } from './compare-chart/compare-chart.component';
import { MarketWatchComponent } from './market-watch/market-watch.component';
import { OrderBookComponent } from './order-book/order-book.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'currency-trading', component: CurrencyTradingComponent, canActivate: [AuthGuard] },
  { path: 'currency-converter', component: CurrencyConverterComponent, canActivate: [AuthGuard] },
  { path: 'exchange-Chart', component: ExchangeChartComponent,canActivate: [AuthGuard]  },
  { path: 'compare-Chart', component: CompareChartComponent,canActivate: [AuthGuard]  },
  { path: 'Market-Watch', component: MarketWatchComponent },
  { path: 'order-book', component: OrderBookComponent ,canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
