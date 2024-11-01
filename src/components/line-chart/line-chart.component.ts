import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total Amount',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };

  public lineChartLegend = true;

  http = inject(HttpClient);

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get<any[]>(`${environment.baseUrl}/payment/get`)
      .subscribe((response) => {
        const aggregatedData: { [key: string]: number } = {};
        for (let d of response) {
          const dateString = d.date;
          const date = new Date(dateString);
          const dateOnly = date.toISOString().split('T')[0];

          if (!aggregatedData[dateOnly]) {
            aggregatedData[dateOnly] = 0;
          }
          aggregatedData[dateOnly] += d.amount / 100;
        }

        const sortedDates = Object.keys(aggregatedData).sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        );

        this.lineChartData.labels = sortedDates;
        this.lineChartData.datasets[0].data = sortedDates.map(
          (date) => aggregatedData[date]
        );

        if (this.chart) {
          this.chart.update();
        }
      });
  }
}
