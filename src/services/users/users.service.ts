import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  tokenKey: string = 'jwtToken';

  http = inject(HttpClient);

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  getEmailFromToken(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub || null;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  }

  async CheckTokenExpried(): Promise<boolean> {
    const token = this.getToken();

    if (token) {
      try {
        const data = await this.http
          .get<any[]>('http://localhost:8080/users/ping')
          .toPromise();
        console.log(data);
        return true;
      } catch (error) {
        this.clearToken();
        console.error(error);
        return false;
      }
    }

    return false;
  }
}
