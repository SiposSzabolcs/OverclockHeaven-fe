import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

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
    const host = 'http://localhost:8080';
    this.http.get(`${host}/payment/session/${sessionId}`).subscribe(
      (response: any) => {
        this.paymentStatus = response.payment_status;
        this.loading = false;

        const postBodyGetId = { email: this.users.getEmailFromToken() };

        this.http
          .post<UserResponse>(
            'http://localhost:8080/users/email',
            postBodyGetId
          )
          .subscribe({
            next: (response) => {
              this.http
                .post(
                  `http://localhost:8080/users/${response.id}/cart/purchase`,
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
