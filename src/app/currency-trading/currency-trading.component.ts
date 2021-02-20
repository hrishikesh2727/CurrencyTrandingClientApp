import { Component, OnInit } from '@angular/core';
import { CurrencyTradingService } from '../services/currency-trading.service';
import { Currency } from '../models/currency';
import { OrderBook } from '../models/order-book';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-currency-trading',
  templateUrl: './currency-trading.component.html',
  styleUrls: ['./currency-trading.component.css']
})
export class CurrencyTradingComponent implements OnInit {

  currencylist: Currency[];
  orderBook: OrderBook = new OrderBook();
  totalAmount:number;

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

  onCurrencyBooking(form: NgForm) {

  }

  onOrderActionChange(event: any) {
    if (event.target.innerText == "Buy") {     
      this.orderBook.orderAction = "Buy";
      this.totalAmount = (Number(this.orderBook.position) - Number(this.orderBook.currencyRate)) * Number(this.orderBook.unit);
    }
    else {
      this.orderBook.orderAction = "Sell";
    }
  }

  onChangeCurrency(event: any) {
    debugger;
    //this.orderBook.currencyName = 
  }

}
