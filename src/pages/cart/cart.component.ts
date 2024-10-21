import { Component, inject, OnInit, Output } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ProductComponent } from '../../components/product/product.component';
import { CommonModule } from '@angular/common';
import { CartProductComponent } from '../../components/cart-product/cart-product.component';
import { map, switchMap } from 'rxjs';
import { StripeFactoryService, StripeInstance } from 'ngx-stripe';
import { Router } from '@angular/router';

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

  ngOnInit(): void {
    this.getCartItems().subscribe(() => {
      this.getTotalPrice();

      this.stripe = this.stripeFactory.create(
        'pk_test_51QBCMmRrg3X4nKEi6z72mICCJQQRT8Xrvjob0mK5SJtr7Lmy3ZiINKZiRgxRobYHiObWcYJBPx4KFZahvkDsDGEK002VM2QxZR'
      );
      this.stripeAmount = this.totalPrice;
    });
  }

  getCartItems() {
    const postBodyGetId = { email: this.users.getEmailFromToken() };

    return this.http
      .post<UserResponse>('http://localhost:8080/users/email', postBodyGetId)
      .pipe(map((response) => (this.cart = response.cart)));
  }

  getTotalPrice() {
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
    const host = 'http://localhost:8080';

    this.http
      .post(
        host + '/payment/checkout-session',
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
