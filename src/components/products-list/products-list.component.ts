import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  @Input() sortBy!: any;
  http = inject(HttpClient);
  data: any[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.http.get<any[]>('http://localhost:8080/products/get').subscribe({
      next: (data) => {
        switch (this.sortBy) {
          case 'priceLowToHigh':
            this.data = data.sort((a, b) => a.price - b.price);
            break;
          case 'priceHighToLow':
            this.data = data.sort((a, b) => b.price - a.price);
            break;
          case 'rating':
          default:
            this.data = data.sort((a, b) => {
              const averageRatingA =
                a.ratings.length > 0
                  ? a.ratings.reduce(
                      (sum: number, rating: number) => sum + rating,
                      0
                    ) / a.ratings.length
                  : 0;
              const averageRatingB =
                b.ratings.length > 0
                  ? b.ratings.reduce(
                      (sum: number, rating: number) => sum + rating,
                      0
                    ) / b.ratings.length
                  : 0;

              return averageRatingB - averageRatingA;
            });
            break;
        }
        console.log(data);

        this.loading = false;
      },
      error: (error) => {
        console.error(error.error.error);
        this.loading = false;
      },
    });
  }
}
