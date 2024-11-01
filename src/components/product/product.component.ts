import { Component, inject, Input, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { UsersService } from '../../services/users/users.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { NotyfService } from '../../services/notyf/notyf.service';
import { environment } from '../../environments/environment.development';

interface UserResponse {
  id: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [StarRatingComponent, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Input() lastElement!: any;
  rating: number = 0;
  userId: number = 0;

  notyf = inject(NotyfService);
  users = inject(UsersService);
  http = inject(HttpClient);
  router = inject(Router);
  productService = inject(ProductService);

  ngOnInit(): void {
    if (this.product.ratings.length != 0) {
      this.rating = this.getRating(this.product.ratings);
    }
  }

  addToCartClicked() {
    const postBodyGetId = { email: this.users.getEmailFromToken() };

    this.http
      .post<UserResponse>(`${environment.baseUrl}users/email`, postBodyGetId)
      .subscribe({
        next: (response) => {
          this.userId = response.id;
          console.log(this.userId);

          this.http
            .post(
              `${environment.baseUrl}users/${this.userId}/cart/add`,
              this.product.id
            )
            .subscribe((response) => {
              this.notyf.success('Item added to cart');
            });
        },
        error: (error) => {
          this.notyf.error('Something went wrong.');
          console.error('Error sending email', error);
        },
      });
  }

  navigateToProductPage() {
    this.productService.setProduct(this.product);
    this.router.navigate(['/products/product']);
  }

  getRating(ratings: { id: number; rating: number; userId: number }[]) {
    const sum = ratings.reduce(
      (total: number, current: { rating: number }) => total + current.rating,
      0
    );
    return sum / ratings.length;
  }
}
