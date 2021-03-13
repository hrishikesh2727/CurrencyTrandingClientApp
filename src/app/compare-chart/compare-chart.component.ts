import { ChartType, Column, Row } from 'angular-google-charts';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrderBook } from '../models/order-book';
import { NgForm } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-compare-chart',
  templateUrl: './compare-chart.component.html',
  styleUrls: ['./compare-chart.component.css']
})
export class CompareChartComponent {

  title : string;
  typeNm = ChartType.LineChart;
  data: Row[];
  columnNames : Column[];
  options = {
    hAxis: {
       title: 'Date'
    },
    vAxis:{
       title: 'Rate(s)'
    },
    colors:["#a52714", "#0000ff", "#ff0000", "#00ff00"]
  };
    width = 1000;
    height = 400;

  constructor(private alertService: AlertService) { }

  onCurrencyMultipleSelection(Cname: string) {
    if(Cname != null)
    {
      this.title = Cname + 'JPY/USD Exchange Historical Data';
      this.data = [
         ["2020-01-01", 0.009133, 0.009136, 0.009118, 0.009132],
         ["2020-01-02", 0.00917, 0.00917, 0.009126, 0.009172],
         ["2020-01-03", 0.009261, 0.009289, 0.009167, 0.009258],
         ["2020-01-04", 0.009224, 0.009237, 0.009207, 0.009225],
         ["2020-01-05", 0.00917, 0.00917, 0.009126, 0.009172],
         ["2020-01-06", 0.009133, 0.009136, 0.009118, 0.009132],
         ["2020-01-07", 0.00917, 0.00917, 0.009126, 0.009172],
         ["2020-01-08", 0.009261, 0.009289, 0.009167, 0.009258],
         ["2020-01-09", 0.009224, 0.009237, 0.009207, 0.009225],
         ["2020-01-10", 0.00917, 0.00917, 0.009126, 0.009172]
      ];
      this.columnNames = ["Month", "EUR/INR", "USD/ESY","USD/ESY", "USD/ESY"];
    }
    else{
      this.alertService.openSnackBar("Please select value for Currency Exchange","Error");
    }
  }
}
