import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/products/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { HttpClient } from '@angular/common/http';

interface CommentObject {
  rating: number;
  name: string;
  content: string;
  userId: number;
}

interface UserResponse {
  id: number;
  firstname: string;
  lastname: string;
}

@Component({
  selector: 'app-rating-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rating-page.component.html',
  styleUrl: './rating-page.component.css',
})
export class RatingPageComponent implements OnInit {
  productService = inject(ProductService);
  users = inject(UsersService);
  http = inject(HttpClient);

  CommentObject: CommentObject = {
    rating: 1,
    name: '',
    content: '',
    userId: 0,
  };
  product: any;

  ngOnInit(): void {
    this.product = this.productService.getProduct();
  }

  isFormValid(): boolean {
    return (
      this.CommentObject.rating >= 1 &&
      this.CommentObject.rating <= 5 &&
      this.CommentObject.name.trim().length > 0 &&
      this.CommentObject.content.trim().length > 0 &&
      this.CommentObject.content.trim().length <= 200 &&
      this.CommentObject.userId != null
    );
  }

  onComment() {
    let email = { email: this.users.getEmailFromToken() };

    this.http
      .post<UserResponse>('http://localhost:8080/users/email', email)
      .subscribe((response) => {
        this.CommentObject.userId = response.id;
        this.CommentObject.name = `${response.firstname} ${response.lastname}`;
        console.log(this.CommentObject);

        if (this.isFormValid()) {
          this.http
            .post(`http://localhost:8080/products/rate/${this.product.id}`, {
              rating: this.CommentObject.rating,
              userId: this.CommentObject.userId,
            })
            .subscribe((response) => {
              console.log(response);
            });

          this.http
            .post(
              `http://localhost:8080/products/comment/${this.product.id}`,
              this.CommentObject
            )
            .subscribe((response) => {
              console.log(response);
            });
        }
      });
  }
}
