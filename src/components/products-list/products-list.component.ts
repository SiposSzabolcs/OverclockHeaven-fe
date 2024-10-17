import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  http = inject(HttpClient);
  data: any[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/products/get').subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error.error.error);
        this.loading = false;
      },
    });
  }
}
