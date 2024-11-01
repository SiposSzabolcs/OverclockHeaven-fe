import { Component, inject, OnInit, Output } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ProductComponent } from '../../components/product/product.component';
import { CommonModule } from '@angular/common';
import { CartProductComponent } from '../../components/cart-product/cart-product.component';
import { map, switchMap } from 'rxjs';
import { StripeFactoryService, StripeInstance } from 'ngx-stripe';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface UserResponse {
  cart: [];
}

interface IStripeSession {
  id: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ProductComponent, CommonModule, CartProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  users = inject(UsersService);
  http = inject(HttpClient);
  stripeFactory = inject(StripeFactoryService);
  router = inject(Router);
  totalPrice: number = 0;
  cart: any[] = [];
  stripe!: StripeInstance;
  stripeAmount!: number;
  isLoading: boolean = false;

  handleItemRemoved(productId: number) {
    this.cart = this.cart.filter((product) => product.id !== productId);
    this.getTotalPrice();
  }

  ngOnInit(): void {
    this.getCartItems().subscribe(() => {
      this.isLoading = false;
      this.getTotalPrice();
    });
  }

  getCartItems() {
    this.isLoading = true;
    const postBodyGetId = { email: this.users.getEmailFromToken() };

    return this.http
      .post<UserResponse>(`${environment.baseUrl}/users/email`, postBodyGetId)
      .pipe(map((response) => (this.cart = response.cart)));
  }

  getTotalPrice() {
    this.totalPrice = 0;
    for (let item of this.cart) {
      this.totalPrice += item.price;
    }
    console.log(this.totalPrice);
  }

  backClicked() {
    this.router.navigateByUrl('products');
  }

  checkout() {
    this.isLoading = true;

    this.stripe = this.stripeFactory.create(environment.stripePublicKey);
    this.stripeAmount = this.totalPrice;

    this.http
      .post(
        `${environment.baseUrl}/payment/checkout-session`,
        {
          amount: this.stripeAmount * 100,
          currency: 'usd',
        },
        { observe: 'response' }
      )
      .pipe(
        switchMap((response: HttpResponse<Object>) => {
          console.log(response);
          const session: IStripeSession = response.body as IStripeSession;
          return this.stripe.redirectToCheckout({ sessionId: session.id });
        })
      )
      .subscribe((result) => {
        if (result.error) {
          console.log(this.stripeAmount);

          console.log(result.error);
        }
      });
  }
}
