import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyTradingService } from '../services/currency-trading.service';
import { Currency } from '../models/currency';
import { OrderBook } from '../models/order-book';
import { NgForm } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-currency-trading',
  templateUrl: './currency-trading.component.html',
  styleUrls: ['./currency-trading.component.css']
})
export class CurrencyTradingComponent implements OnInit,AfterViewInit {

  currencylist: Currency[];
  orderBook: OrderBook = new OrderBook();
  totalAmount:number=0;
  isProfit : boolean;
  orderBookList : OrderBook[];
  displayedColumns = ['currencyName','currentRate','position','unit','totalAmount','endAction','orderAction'];
  dataSource = new MatTableDataSource<OrderBook>();

  @ViewChild(MatSort) sort: MatSort;

  constructor(private currencyTradingService: CurrencyTradingService,private alertService: AlertService) { }

  ngOnInit(): void {
    this.getAllCurrency();
    this.getOrderBook();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getAllCurrency() {
    this.currencyTradingService.getAllCurrency<Currency[]>().subscribe(
      result => {
        this.currencylist = result;
      },
      error => {
        this.alertService.openSnackBar("Data is not present","Error");
      }
    );
  }

  onCurrencyBooking(form: NgForm) {
    if(form.valid){
      this.currencyTradingService.addOrderBook<OrderBook>(this.orderBook).subscribe(
        result => {
          this.alertService.openSnackBar("Order is booked","Done");
          this.orderBook = new OrderBook();
          form.resetForm();
        },
        error => {
          this.alertService.openSnackBar("Unable to save","Error");
        }
      );
    }
    else{
      this.alertService.openSnackBar("Please enter the require details","Error");
    }
  }

  getOrderBook() {    
      this.currencyTradingService.getOrderBook<OrderBook[]>().subscribe(
        result => {
          this.orderBookList = result;
          this.dataSource.data = result;
        },
        error => {
          this.alertService.openSnackBar("Unable to load the Orders","Error");
        }
      );    
  }

  onOrderActionChange(event: any) {
    if (event.target.innerText == "Buy") {     
      this.orderBook.orderAction = "Buy";
      this.totalAmount = (Number(this.orderBook.position) - Number(this.orderBook.currencyRate)) * Number(this.orderBook.unit);      
      if(this.totalAmount >= 0){
        this.isProfit = true;
        this.orderBook.endAction ="Profit";
      }
      else{
        this.isProfit = false;
        this.totalAmount = -this.totalAmount;
        this.orderBook.endAction ="Loss";
      }
       
      this.orderBook.totalAmount = String(this.totalAmount);
    }
    else {
      this.orderBook.orderAction = "Sell";
    }
  }
 
}
