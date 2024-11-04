import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotyfService } from '../../services/notyf/notyf.service';
import { environment } from '../../environments/environment';

interface LoginObject {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObject: LoginObject = {
    email: '',
    password: '',
  };
  isLoading = false;
  alertState = false;

  http = inject(HttpClient);
  router = inject(Router);
  notyf = inject(NotyfService);

  isFormInvalid(): boolean {
    return !this.loginObject.email || !this.loginObject.password;
  }

  onLogin(mode: string) {
    setTimeout(() => {
      this.isLoading = true;
    }, 3000);

    if (mode === 'demo') {
      this.loginObject.email = 'demo@gmail.com';
      this.loginObject.password = 'test12';
    }

    if (mode == 'admin') {
      this.loginObject.email = 'demoadmin@gmail.com';
      this.loginObject.password = 'test123';
    }

    console.log(this.loginObject);

    this.http
      .post(`${environment.baseUrl}/auth/authenticate`, this.loginObject)
      .subscribe((res: any) => {
        if (res.result) {
          this.alertState = false;
          this.notyf.success('Logged in successfully');
          localStorage.setItem('jwtToken', res.token);
          this.router.navigateByUrl('');
        } else {
          this.alertState = true;
          this.notyf.error(res.msg);
        }
      });
  }
}
