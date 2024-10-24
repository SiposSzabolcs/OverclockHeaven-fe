import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/products/product.service';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { UserReviewStarsComponent } from '../../components/user-review-stars/user-review-stars.component';
import { AddProductPageComponent } from '../add-product-page/add-product-page.component';

@Component({
  selector: 'app-single-product-page',
  standalone: true,
  imports: [
    StarRatingComponent,
    CommonModule,
    UserReviewStarsComponent,
    AddProductPageComponent,
  ],
  templateUrl: './single-product-page.component.html',
  styleUrl: './single-product-page.component.css',
})
export class SingleProductPageComponent {
  product: any;
  rating: number = 0;

  productService = inject(ProductService);

  ngOnInit(): void {
    this.product = this.productService.getProduct();
    if (this.product.ratings.length != 0) {
      this.rating = this.getRating(this.product.ratings);
    }
  }

  getRating(ratings: { id: number; rating: number; userId: number }[]) {
    const sum = ratings.reduce(
      (total: number, current: { rating: number }) => total + current.rating,
      0
    );
    return sum / ratings.length;
  }
}
