import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { HttpClient } from '@angular/common/http';
import { ProductComponent } from '../../components/product/product.component';
import { CommonModule } from '@angular/common';
import { CartProductComponent } from '../../components/cart-product/cart-product.component';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

interface UserResponse {
  cart: [];
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
  router = inject(Router);
  totalPrice: number = 0;
  cart: any[] = [];

  ngOnInit(): void {
    this.getCartItems().subscribe(() => {
      this.getTotalPrice();
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

  routerConfig(destination: string) {
    switch (destination) {
      case 'back':
        this.router.navigateByUrl('products');
        break;
      case 'continue':
        this.router.navigateByUrl('');
        break;
    }
  }
}
