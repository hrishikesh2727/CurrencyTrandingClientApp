import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Currency } from '../models/currency';
import { CurrencyConverter } from '../models/currency-converter';
import { AlertService } from '../services/alert.service';
import { CurrencyTradingService } from '../services/currency-trading.service';
import { UiService } from '../services/ui.service';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  private loadingSubs: Subscription;
  currencylist: Currency[];
  liveCurrencylist: Currency[]=[];
  currencyConverter : CurrencyConverter = new CurrencyConverter();
  lCurrency:Currency;

  constructor(private uiService: UiService, private currencyTradingService: CurrencyTradingService, private alertService: AlertService) { }

  ngOnInit(): void {

    this.loadingSubs = this.uiService.loadingStageChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });    
    this.getAllCurrency();
  }

  getAllCurrency() {
    this.uiService.showProgressBar();
    this.currencyTradingService.getAllCurrency<Currency[]>().subscribe(
      result => {
        this.lCurrency = new Currency();
        this.lCurrency.currencyCode="USD";
        this.lCurrency.currencyDescription="American USD";
        this.lCurrency.currencyName="USD - American Doller";
        this.lCurrency.currencyRate=1.19125;
        let cList : Currency[] = [];
        cList.push(this.lCurrency);
        this.currencylist = cList;
        for( let currency of result){
          currency.currencyName = currency.currencyName + "-"+currency.currencyDescription;
        }
        this.liveCurrencylist = result;
        this.uiService.hideProgressBar();
      },
      error => {
        this.alertService.openSnackBar("Data is not present", "Error");
      }
    );
  }

 
  fromCurrencyDesc:any;
  fromCurrencyName:any;
  fromCurrencyRate:any;
  toCurrencyDesc:any;
  toCurrencyName:any;
  toCurrencyRate:any;
  
  totalAmt : any;
  isCurrencyConvert : boolean;

  onCurrencyBooking(form: NgForm){
    let liveCurrencyList = this.liveCurrencylist.filter(
      currencyObj => currencyObj.currencyName === form.value.toCurrency);
      for (var val of this.liveCurrencylist) {
        if(val.currencyDescription ===  form.value.toCurrency){
          this.fromCurrencyRate = this.currencylist[0].currencyRate;
          this.fromCurrencyName = this.currencylist[0].currencyName;
  
          this.toCurrencyDesc = form.value.toCurrency;
          this.toCurrencyRate = val.currencyRate;
          this.toCurrencyName = val.currencyName;
  
          this.totalAmt = Number(form.value.txtAmount) * Number(this.toCurrencyRate);
          this.isCurrencyConvert = true;
        }
      }
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
