import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit, OnChanges {
  @Input() sortBy!: string;
  @Input() tag!: string;
  urlTag: string = '';
  http = inject(HttpClient);
  data: any[] = [];
  loading: boolean = true;

  ngOnInit() {
    this.fetchProductsByTag();
  }

  fetchProductsByTag() {
    this.loading = true;

    switch (this.tag) {
      case 'CPUs':
        this.urlTag = 'cpu';
        break;
      case 'Graphics cards':
        this.urlTag = 'gpu';
        break;
      case 'RAM sticks':
        this.urlTag = 'ram';
        break;
      case 'Motherboards':
        this.urlTag = 'motherboard';
        break;
      case 'Prebuilt PCs':
        this.urlTag = 'prebuilt';
        break;
      default:
        this.urlTag = 'gpu';
        break;
    }

    this.http
      .get<any[]>(`${environment.baseUrl}/products/get/${this.urlTag}`)
      .subscribe({
        next: (data) => {
          this.data = data;
          this.sortProducts();
          this.loading = false;
        },
        error: (error) => {
          console.error(error.error.error);
          this.loading = false;
        },
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sortBy']) {
      this.sortProducts();
    }

    if (changes['tag']) {
      this.fetchProductsByTag();
    }
  }

  private sortProducts() {
    switch (this.sortBy) {
      case 'priceLowToHigh':
        this.data.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        this.data.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
      default:
        this.data.sort((a, b) => {
          const averageRatingA =
            a.ratings.length > 0
              ? a.ratings.reduce(
                  (sum: number, rating: { rating: number }) =>
                    sum + rating.rating,
                  0
                ) / a.ratings.length
              : 0;
          const averageRatingB =
            b.ratings.length > 0
              ? b.ratings.reduce(
                  (sum: number, rating: { rating: number }) =>
                    sum + rating.rating,
                  0
                ) / b.ratings.length
              : 0;

          return averageRatingB - averageRatingA;
        });
        break;
    }
  }
}
