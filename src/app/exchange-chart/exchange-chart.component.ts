import { ChartType, Row } from 'angular-google-charts';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OrderBook } from '../models/order-book';
import { NgForm } from '@angular/forms';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-currency-trading',
  templateUrl: './exchange-chart.component.html',
  styleUrls: ['./exchange-chart.component.css']
})

export class ExchangeChartComponent {

  title: string;
  typeNm = ChartType.CandlestickChart;
  data: Row[];
  columnNames = ['Date', 'open', 'high', 'low', 'close'];
  options = {
    legend: 'none',
    candlestick: {
      fallingColor: { strokeWidth: 22, stroke: '#a52714' }, // red
      risingColor: { strokeWidth: 22, stroke: '#0f9d58' }   // green
    }
  }
  width = 1000;
  height = 400;
  constructor(private alertService: AlertService) { }

  onCurrencySelection(Cname: string) {
    if (Cname != null) {
      this.title = Cname + ' Exchange Historical Data';
      if (Cname === "USDINR") {
        this.data = [
          ["2021-03-01", 73.3693, 73.693, 73.1693, 73.9693],
          ["2021-03-02", 73.9693, 73.2902, 73.7902, 73.8902],
          ["2021-03-03", 72.8902, 72.1932, 72.5932, 72.7932],
          ["2021-03-04", 72.7932, 72.678, 72.73985, 72.89],
          ["2021-03-05", 73.89, 73.29395, 73.795, 73.29395],
          ["2021-03-06", 73.29395, 73.1809, 73.6809, 73.9809],
          ["2021-03-07", 73.9809, 73.1809, 73.56, 73.33025],
          ["2021-03-08", 73.33025, 73.33025, 73.33025, 73.33025],
          ["2021-03-09", 73.33025, 72.90355, 72.90355, 72.90355],
          ["2021-03-10", 72.90355, 72.7895, 72.7895, 72.7895],
          ["2021-03-11", 72.69865, 72.69865, 72.69865, 72.69865],
          ["2021-03-12", 72.7895, 72.6782, 72.6782, 72.6782],
          ["2021-03-13", 72.6782, 72.68925, 72.68925, 72.9]
        ];
      }
      else {
        this.data = [
          ["2021-03-01", 106.676, 106.676, 106.676, 106.676],
          ["2021-03-02", 106.747, 106.747, 106.747, 106.747],
          ["2021-03-03", 106.932, 106.932, 106.932, 106.932],
          ["2021-03-04", 107.546, 107.546, 107.546, 107.546],
          ["2021-03-05", 108.269, 108.269, 108.269, 108.269],
          ["2021-03-06", 108.405, 108.405, 108.405, 108.405],
          ["2021-03-07", 108.405, 108.405, 108.405, 108.405],
          ["2021-03-08", 108.925, 108.925, 108.925, 108.925],
          ["2021-03-09", 108.625, 108.625, 108.625, 108.625],
          ["2021-03-10", 108.615, 108.615, 108.615, 108.615],
          ["2021-03-11", 108.44, 108.44, 108.44, 108.44],
          ["2021-03-12", 108.846, 108.846, 108.846, 108.846],
          ["2021-03-13", 108.846, 108.846, 108.846, 108.846]
        ];
      }
    }
    else {
      this.alertService.openSnackBar("Please select value for Currency Exchange", "Error");
    }
  }

}



