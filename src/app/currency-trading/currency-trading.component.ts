import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CurrencyTradingService } from '../services/currency-trading.service';
import { Currency } from '../models/currency';
import { OrderBook } from '../models/order-book';
import { NgForm } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UiService } from '../services/ui.service';
import { Subscription } from 'rxjs';
import { numbers } from '@material/snackbar';

@Component({
  selector: 'app-currency-trading',
  templateUrl: './currency-trading.component.html',
  styleUrls: ['./currency-trading.component.css']
})
export class CurrencyTradingComponent implements OnInit, AfterViewInit, OnDestroy {

  currencylist: Currency[];
  orderBook: OrderBook = new OrderBook();
  totalAmount: number = 0;
  isProfit: boolean;
  orderBookList: OrderBook[];
  displayedColumns = ['currencyName', 'currentRate', 'position', 'unit', 'totalAmount', 'endAction', 'orderAction'];
  dataSource = new MatTableDataSource<OrderBook>();
  isLoading: boolean;
  private loadingSubs: Subscription;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private currencyTradingService: CurrencyTradingService, private alertService: AlertService, private uiService: UiService) { }

  ngOnInit(): void {
    this.getAllCurrency();
    this.getOrderBook();
    this.loadingSubs = this.uiService.loadingStageChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllCurrency() {
    this.currencyTradingService.getAllCurrency<Currency[]>().subscribe(
      result => {
        for (let currency of result) {
          currency.currencyName = currency.currencyName + "-" + currency.currencyDescription;
        }
        this.currencylist = result;
      },
      error => {
        this.alertService.openSnackBar("Data is not present", "Error");
      }
    );
  }

  onCurrencyBooking(form: NgForm, event: any, actionType: any) {
    if (actionType == "submit") {
      if (form.valid) {
        this.uiService.showProgressBar();
        this.currencyTradingService.addOrderBook<OrderBook>(this.orderBook).subscribe(
          result => {
            this.alertService.openSnackBar("Order is booked", "Done");
            this.orderBook = new OrderBook();
            form.resetForm();
            this.uiService.hideProgressBar();
            this.getOrderBook();
          },
          error => {
            this.alertService.openSnackBar("Unable to save", "Error");
            this.uiService.hideProgressBar();
          }
        );
      }
      else {
        this.alertService.openSnackBar("Please enter the require details", "Error");
      }
    }
    else {
      this.onOrderActionChange(form, event, actionType);
    }
  }

  getOrderBook() {
    this.uiService.showProgressBar();
    this.currencyTradingService.getOrderBook<OrderBook[]>().subscribe(
      result => {
        this.uiService.hideProgressBar();
        this.orderBookList = result;
        this.dataSource.data = result;
        this.alertService.openSnackBar("Last orders loaded", "Done");
      },
      error => {
        this.alertService.openSnackBar("Unable to load the Orders", "Error");
      }
    );
  }

  onOrderActionChange(form: NgForm, event: any, actionType: any) {
    if (actionType == "orderType") {
      if (event.target.innerText == "Buy") {
        this.orderBook.orderAction = "Buy";
        this.totalAmount = (Number(this.orderBook.position) - Number(this.orderBook.currentRate)) * Number(this.orderBook.unit);
        if (this.totalAmount >= 0) {
          this.isProfit = true;
          this.orderBook.endAction = "Profit";
        }
        else {
          this.isProfit = false;
          this.totalAmount = -this.totalAmount;
          this.orderBook.endAction = "Loss";
        }

        this.orderBook.totalAmount = String(this.totalAmount.toFixed(2));
      }
      else {
        this.orderBook.orderAction = "Sell";
      }
    }
  }

  onForexSelectionChanged(event: any) {
    if (this.currencylist.filter(s => s.currencyDescription == event.value).length > 0) {
      let rate = this.currencylist.filter(s => s.currencyDescription == event.value)[0];
      this.orderBook.currentRate = String(rate.currencyRate);
    }
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
