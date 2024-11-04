import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartProductComponent } from '../../components/cart-product/cart-product.component';
import { environment } from '../../environments/environment';

interface UserResponse {
  purchaseHistory: [];
}
@Component({
  selector: 'app-purchase-history-page',
  standalone: true,
  imports: [CommonModule, CartProductComponent],
  templateUrl: './purchase-history-page.component.html',
  styleUrl: './purchase-history-page.component.css',
})
export class PurchaseHistoryPageComponent implements OnInit {
  users = inject(UsersService);
  http = inject(HttpClient);
  isLoading: boolean = false;
  purchaseHistory: any[] = [];

  ngOnInit(): void {
    this.getPurchaseHistory().subscribe(() => {
      this.isLoading = false;
    });
  }

  getPurchaseHistory() {
    this.isLoading = true;
    const postBodyGetId = { email: this.users.getEmailFromToken() };

    return this.http
      .post<UserResponse>(`${environment.baseUrl}/users/email`, postBodyGetId)
      .pipe(
        map((response) => (this.purchaseHistory = response.purchaseHistory))
      );
  }
}
