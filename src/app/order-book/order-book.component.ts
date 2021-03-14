import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Currency } from '../models/currency';
import { OrderBook } from '../models/order-book';
import { AlertService } from '../services/alert.service';
import { CurrencyTradingService } from '../services/currency-trading.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.css']
})
export class OrderBookComponent implements OnInit {

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
    this.getOrderBook();
  }
  

  getOrderBook() {
    this.uiService.showProgressBar();
    this.currencyTradingService.getOrderBook<OrderBook[]>().subscribe(
      result => {
        this.uiService.hideProgressBar();
        this.orderBookList = result;
        this.dataSource.data = result;
        this.dataSource = new MatTableDataSource<OrderBook>(result);
        this.alertService.openSnackBar("Last orders loaded", "Done");
      },
      error => {
        this.alertService.openSnackBar("Unable to load the Orders", "Error");
      }
    );
  }

}
