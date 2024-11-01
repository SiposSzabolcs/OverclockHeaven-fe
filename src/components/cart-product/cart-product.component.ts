import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';
import { UsersService } from '../../services/users/users.service';
import { HttpClient } from '@angular/common/http';
import { NotyfService } from '../../services/notyf/notyf.service';
import { environment } from '../../environments/environment.development';

interface UserResponse {
  id: number;
}

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent {
  @Input() product: any;
  @Input() showPrice: boolean = true;
  @Output() itemRemoved = new EventEmitter<number>();

  notyf = inject(NotyfService);
  users = inject(UsersService);
  http = inject(HttpClient);
  router = inject(Router);
  productService = inject(ProductService);

  removeFromCartClicked() {
    const postBodyGetId = { email: this.users.getEmailFromToken() };

    this.http
      .post<UserResponse>(`${environment.baseUrl}/users/email`, postBodyGetId)
      .subscribe({
        next: (response) => {
          this.http
            .post(
              `${environment.baseUrl}/users/${response.id}/cart/remove`,
              this.product.id
            )
            .subscribe((response) => {
              this.notyf.success('Item removed from cart');
              this.itemRemoved.emit(this.product.id);
            });
        },
        error: (error) => {
          this.notyf.error('Something went wrong.');
          console.error('Error sending email', error);
        },
      });
  }

  rateButtonClicked() {
    this.productService.setProduct(this.product);
    this.router.navigateByUrl('products/rating');
  }
}
