import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class OrderBookComponent implements OnInit, OnDestroy {

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
    this.loadingSubs = this.uiService.loadingStageChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    }); 
  }


  getOrderBook() {
    this.uiService.showProgressBar();
    this.currencyTradingService.getOrderBook<OrderBook[]>().subscribe(
      result => {
        this.uiService.hideProgressBar();
        this.getAllCurrency(result);
        this.orderBookList = result;
        
        this.alertService.openSnackBar("Last orders loaded", "Done");
      },
      error => {
        this.alertService.openSnackBar("Unable to load the Orders", "Error");
      }
    );
  }

  getLiveRates(cname: string, currencyList: Currency[]) {
    this.uiService.showProgressBar();
    this.currencyTradingService.getCurrencyRate<string>(cname).subscribe(
      result => {
        let cRate = Object.values(Object.values(Object.values(result)[0])[0])[0];        
        for (let objCurrency of currencyList.filter(s=>s.currencyCode == cname.replace("USD",""))) {
          if(this.orderBookList.filter(s => s.currencyName == objCurrency.currencyDescription).length > 0){
            for(let updatedOrder of this.orderBookList){
              if(updatedOrder.currencyName === objCurrency.currencyDescription){
                updatedOrder.position = cRate;
                updatedOrder.endAction = String(Number(updatedOrder.unit) * Number(cRate));
              }
            }          
          }
        }
        this.dataSource.data = this.orderBookList;
        this.dataSource = new MatTableDataSource<OrderBook>(this.orderBookList);
        this.uiService.hideProgressBar();
      },
      error => {

      }
    );
  }

  getAllCurrency(orderBookList: OrderBook[]) {
    this.uiService.showProgressBar();
    this.currencyTradingService.getAllCurrency<Currency[]>().subscribe(
      result => {
        this.uiService.hideProgressBar();
        for (let orderBookObj of orderBookList) {
          this.getLiveRates("USD" + result.filter(s => s.currencyDescription == orderBookObj.currencyName)[0].currencyName, result)
        }
      },
      error => {

      }
    );
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
