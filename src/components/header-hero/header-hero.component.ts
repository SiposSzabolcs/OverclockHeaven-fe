import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-hero',
  standalone: true,
  imports: [],
  templateUrl: './header-hero.component.html',
  styleUrl: './header-hero.component.css',
})
export class HeaderHeroComponent implements OnInit {
  http = inject(HttpClient);

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/products/get').subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
