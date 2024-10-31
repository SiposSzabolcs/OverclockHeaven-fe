import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css',
})
export class BarChartComponent implements OnChanges {
  @Input() data!: any[];
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Income',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 3,
      },
    ],
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  public barChartLegend = true;

  http = inject(HttpClient);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.aggragateData();
    }
  }

  aggragateData() {
    console.log(this.data);

    const aggregatedData: { [key: string]: number } = {};
    for (let d of this.data) {
      if (!aggregatedData[d.product.tag]) {
        aggregatedData[d.product.tag] = 0;
      }
      aggregatedData[d.product.tag] += d.amount * d.product.price;
    }
    const sortedData = Object.entries(aggregatedData).sort(
      (a, b) => b[1] - a[1]
    );

    const labels = sortedData.map((item) => item[0]);
    const data = sortedData.map((item) => item[1]);

    this.barChartData.labels = labels;
    this.barChartData.datasets[0].data = data;

    if (this.chart) {
      this.chart.update();
    }
  }
}
