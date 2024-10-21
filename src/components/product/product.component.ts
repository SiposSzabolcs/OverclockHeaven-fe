import { Component, inject, Input, OnInit } from '@angular/core';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { UsersService } from '../../services/users/users.service';
import { HttpClient } from '@angular/common/http';

interface UserResponse {
  id: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  rating: number = 0;
  userId: number = 0;
  users = inject(UsersService);
  http = inject(HttpClient);

  ngOnInit(): void {
    if (this.product.ratings.length != 0) {
      this.rating = this.getRating(this.product.ratings);
    }
  }

  addToCartClicked() {
    const postBodyGetId = { email: this.users.getEmailFromToken() };

    this.http
      .post<UserResponse>('http://localhost:8080/users/email', postBodyGetId)
      .subscribe({
        next: (response) => {
          this.userId = response.id;
          console.log(this.userId);

          this.http
            .post(
              `http://localhost:8080/users/${this.userId}/cart/add`,
              this.product.id
            )
            .subscribe({});
        },
        error: (error) => {
          console.error('Error sending email', error);
        },
      });
  }

  getRating(ratings: number[]) {
    const sum = ratings.reduce((a: number, b: number) => a + b, 0);
    return sum / ratings.length;
  }
}
