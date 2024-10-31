import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { HttpClient } from '@angular/common/http';
import { TopSellingComponent } from '../../components/top-selling/top-selling.component';

@Component({
  selector: 'app-analytics-page',
  standalone: true,
  imports: [
    CommonModule,
    BarChartComponent,
    LineChartComponent,
    TopSellingComponent,
  ],
  templateUrl: './analytics-page.component.html',
  styleUrl: './analytics-page.component.css',
})
export class AnalyticsPageComponent implements OnInit {
  http = inject(HttpClient);
  data: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http
      .get<any[]>('http://localhost:8080/products/sold/get')
      .subscribe((response) => {
        this.data = response;
      });
  }
}
