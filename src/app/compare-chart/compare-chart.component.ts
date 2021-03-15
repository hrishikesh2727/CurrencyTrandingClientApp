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

  title: string;
  typeNm = ChartType.LineChart;
  data: Row[];
  columnNames: Column[];
  options = {
    hAxis: {
      title: 'Date'
    },
    vAxis: {
      title: 'Rate(s)'
    },
    colors: ["#a52714", "#0000ff", "#ff0000", "#00ff00"]
  };
  width = 1000;
  height = 400;

  constructor(private alertService: AlertService) { }

  onCurrencyMultipleSelection(Cname: string) {
    if (Cname != null) {
      this.title = "Compare Chart for ";
      this.title = this.title + Cname;
      this.data = [
        ["2021-03-01", 73.3693, 106.676, 15.7286, 7.75665],
        ["2021-03-02", 73.2902, 106.747, 15.6795, 7.75791],
        ["2021-03-03", 72.8932, 106.932, 15.6724, 7.75645],
        ["2021-03-04", 72.73985, 107.546, 15.696, 7.75849],
        ["2021-03-05", 73.29395, 108.269, 15.6985, 7.764],
        ["2021-03-06", 73.1809, 108.405, 15.69725, 7.76335],
        ["2021-03-07", 73.1809, 108.405, 15.69725, 7.76335],
        ["2021-03-08", 73.33025, 108.925, 15.7292, 7.76985],
        ["2021-03-09", 72.90355, 108.625, 15.7298, 7.76175],
        ["2021-03-10", 72.7895, 108.615, 15.7294, 7.76135],
        ["2021-03-11", 72.69865, 108.44, 15.7018, 7.76005],
        ["2021-03-12", 72.6782, 108.846, 15.6989, 7.76582],
        ["2021-03-13", 72.68925, 108.85, 15.7001, 7.76582]
      ];
      this.columnNames = ["Date", "USD/INR", "USD/JPY", "USD/EGP", "USD/HKD"];
    }
    else {
      this.alertService.openSnackBar("Please select value for Currency Exchange", "Error");
    }
  }
}
