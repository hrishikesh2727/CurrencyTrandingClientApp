import { Component, OnInit } from '@angular/core';
import { CurrencyTradingService } from '../services/currency-trading.service';
import { Currency } from '../models/currency';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-currency-trading',
  templateUrl: './currency-trading.component.html',
  styleUrls: ['./currency-trading.component.css']
})
export class CurrencyTradingComponent implements OnInit {

  currencylist: Currency[];

  constructor(private currencyTradingService: CurrencyTradingService) { }

  ngOnInit(): void {
    this.getAllCurrency();
  }

  getAllCurrency() {
    this.currencyTradingService.getAllCurrency<Currency[]>().subscribe(
      result => {
        this.currencylist = result;
      },
      error => {
        console.log("Currency Master data not found.");
      }
    );
  }

  onCurrencyBooking(form: NgForm){
    
  }

}
