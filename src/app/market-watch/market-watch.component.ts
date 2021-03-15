import { ChartType, Column, Row } from 'angular-google-charts';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyTradingService } from '../services/currency-trading.service';
import { AlertService } from '../services/alert.service';
import { UiService } from '../services/ui.service';
import { Subject, Subscription } from 'rxjs';
import { LiveRates } from '../models/live-rates';
import { Title } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'market-watch',
  templateUrl: './market-watch.component.html',
  styleUrls: ['./market-watch.component.css']
})
export class MarketWatchComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'symbol', 'date', 'value'];

  liverates: LiveRates = new LiveRates();
  liveratesList: LiveRates[] = [];
  rs: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  liverateStageChanged = new Subject<LiveRates>();
  private liverateStagSubs: Subscription;
  dataSource = new MatTableDataSource<LiveRates>(this.liveratesList);

  constructor(private currencyTradingService: CurrencyTradingService, private alertService: AlertService, private uiService: UiService) { }


  ngOnInit(): void {


    for (let pname of ELEMENT_DATA) {
      this.liverates = new LiveRates();
      this.liverates.symbol = pname.symbol;
      this.liverates.position = pname.position;
      this.liverates.ratedate = new Date();
      this.liverates.currentValue = 0;
      this.liverates.previousValue = 0;
      this.liveratesList.push(this.liverates);
    }
    setInterval(() => this.retriveRates(), 500);

    this.liverateStagSubs = this.liverateStageChanged.subscribe(updatedLiveRates => {
      this.pushToArray(this.liveratesList, updatedLiveRates);
      this.dataSource = new MatTableDataSource<LiveRates>(this.liveratesList);
    });

  }

  pushToArray(arr, obj) {
    const index = arr.findIndex((e) => e.symbol === obj.symbol);
    if (index === -1) {
      arr.push(obj);
    } else {
      obj.position = arr[index].position;
      if (arr[index].currentValue != obj.currentValue) {
        obj.previousValue = arr[index].currentValue;
      }
      else {
        obj.previousValue = arr[index].previousValue;
      }
      arr[index] = obj;
    }
  }

  retriveRates() {
    //this.liveratesList = [];
    for (let pname of ELEMENT_DATA) {
      this.getLiveRates(pname.symbol);
    }
  }

  getLiveRates(cname: string) {
    this.currencyTradingService.getCurrencyRate<string>(cname).subscribe(
      result => {
        let vresult = Object.values(Object.values(Object.values(result)[0])[0])[0];
        let vdate = Number(Object.values(Object.values(Object.values(result)[0])[0])[1]) * 1000;
        this.liverates = new LiveRates();
        this.liverates.symbol = cname;
        this.liverates.ratedate = new Date(vdate);
        this.liverates.currentValue = Number(vresult);
        this.liverateStageChanged.next(this.liverates);
      },
      error => {
        console.log(error);
        return null;
        this.alertService.openSnackBar(error, "Error");
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.liverateStagSubs.unsubscribe();
  }
}

export interface PeriodicElement {
  symbol: string;
  position: number;
  value: number;
  date: Date;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, symbol: 'USDINR', date: new Date(1615727542 * 1000), value: 1.0079 },
  { position: 2, symbol: 'USDEUR', date: new Date(1615727542), value: 4.0026 },
  { position: 3, symbol: 'USDAUD', date: new Date(1615727542), value: 6.941 },
  { position: 4, symbol: 'USDSGD', date: new Date(1615727542 * 1000), value: 1.0079 },
  { position: 5, symbol: 'USDKWD', date: new Date(1615727542), value: 4.0026 },
  { position: 6, symbol: 'USDAED', date: new Date(1615727542), value: 6.941 },
  { position: 7, symbol: 'USDRUB', date: new Date(1615727542 * 1000), value: 1.0079 },
  { position: 8, symbol: 'USDJPY', date: new Date(1615727542), value: 4.0026 },
  { position: 9, symbol: 'USDLKR', date: new Date(1615727542), value: 6.941 }
];
