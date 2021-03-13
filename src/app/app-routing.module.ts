import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
//import { TrainingComponent } from './training/training.component';
import { AuthGuard } from './auth/auth.guard';
import { CurrencyTradingComponent } from './currency-trading/currency-trading.component';
import { ExchangeChartComponent } from './exchange-chart/exchange-chart.component'
import { CompareChartComponent } from './compare-chart/compare-chart.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'exchange-Chart', component: ExchangeChartComponent },
  { path: 'compare-Chart', component: CompareChartComponent },
  { path: 'currency-trading', component: CurrencyTradingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
