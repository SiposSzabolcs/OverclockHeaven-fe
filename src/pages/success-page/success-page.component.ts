import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { environment } from '../../environments/environment.development';

interface UserResponse {
  id: number;
}

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.css',
})
export class SuccessPageComponent {
  users = inject(UsersService);
  sessionId!: string;
  paymentStatus!: string;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sessionId = params['session_id'];
      this.checkPaymentStatus(this.sessionId);
    });
  }

  checkPaymentStatus(sessionId: string) {
    this.http
      .get(`${environment.baseUrl}/payment/session/${sessionId}`)
      .subscribe(
        (response: any) => {
          console.log(response);

          this.paymentStatus = response.payment_status;
          this.loading = false;

          this.http
            .post(`${environment.baseUrl}/payment/add`, {
              amount: response.amount_total,
              userEmail: this.users.getEmailFromToken(),
            })
            .subscribe((response) => {
              console.log(response);
            });

          this.http
            .post<UserResponse>(`${environment.baseUrl}/users/email`, {
              email: this.users.getEmailFromToken(),
            })
            .subscribe({
              next: (response) => {
                this.http
                  .post(
                    `${environment.baseUrl}/users/${response.id}/cart/purchase`,
                    null
                  )
                  .subscribe((response) => {
                    console.log(response);
                  });
              },
              error: (error) => {
                console.error('Error sending email', error);
              },
            });
        },
        (error) => {
          console.error('Error fetching payment status:', error);
          this.loading = false;
        }
      );
  }
}
