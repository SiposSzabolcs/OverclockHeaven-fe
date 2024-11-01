import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { LineChartComponent } from '../../components/line-chart/line-chart.component';
import { HttpClient } from '@angular/common/http';
import { TopSellingComponent } from '../../components/top-selling/top-selling.component';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
  router = inject(Router);
  data: any[] = [];

  ngOnInit(): void {
    this.fetchData();
  }

  backArrowClick() {
    this.router.navigateByUrl('admin');
  }

  fetchData() {
    this.http
      .get<any[]>(`${environment.baseUrl}/products/sold/get`)
      .subscribe((response) => {
        this.data = response;
      });
  }
}
