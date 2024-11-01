import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UsersService } from '../../services/users/users.service';
import { HttpClient } from '@angular/common/http';
import { NotyfService } from '../../services/notyf/notyf.service';
import { environment } from '../../environments/environment.development';

interface UserResponse {
  role: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isDropdownVisible = false;
  activeNavItem: string = 'Home';
  isUserDropdownVisible: boolean = false;
  dropdown_top_percent = '75%';
  isLoggedIn = false;
  isAuthorized: boolean = false;

  notyf = inject(NotyfService);
  router = inject(Router);
  users = inject(UsersService);
  http = inject(HttpClient);

  async ngOnInit() {
    const storedNavItem = localStorage.getItem('activeNavItem');
    if (storedNavItem) {
      this.activeNavItem = storedNavItem;
    }

    if (localStorage.getItem('jwtToken')) {
      this.isUserAuthorized();
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.setActiveBasedOnRoute(currentUrl);
      });

    const isValid = await this.users.CheckTokenExpried();
    console.log(isValid);

    if (isValid) {
      this.isLoggedIn = true;
    }
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  setActive(navItem: string) {
    this.activeNavItem = navItem;
  }

  isUserAuthorized() {
    let email = { email: this.users.getEmailFromToken() };

    this.http
      .post<UserResponse>(`${environment.baseUrl}/users/email`, email)
      .subscribe((response) => {
        console.log(response);

        if (response.role === 'ADMIN') {
          this.isAuthorized = true;
        }

        console.log(this.isAuthorized);
      });
  }

  toggleUserDropdown(event: MouseEvent) {
    let pixel;
    if (event.layerY < 25) {
      pixel = 25;
    } else {
      pixel = event.layerY;
    }
    this.dropdown_top_percent = `${pixel}%`;
    this.isUserDropdownVisible = !this.isUserDropdownVisible;
  }

  dropdownConfig(button: string) {
    switch (button) {
      case 'login':
        this.router.navigateByUrl('login');
        this.isUserDropdownVisible = false;
        break;
      case 'logout':
        localStorage.removeItem('jwtToken');
        this.isLoggedIn = false;
        this.notyf.success('Logged out successfully');
        this.isUserDropdownVisible = false;
        break;
      case 'cart':
        this.router.navigateByUrl('cart');
        this.isUserDropdownVisible = false;
        break;
      case 'purchaseHistory':
        this.router.navigateByUrl('purchaseHistory');
        this.isUserDropdownVisible = false;
        break;
      case 'admin':
        this.router.navigateByUrl('admin');
        this.isUserDropdownVisible = false;
        break;
    }
  }

  private setActiveBasedOnRoute(url: string) {
    if (url.includes('features')) {
      this.activeNavItem = 'Features';
    } else if (url.includes('contact')) {
      this.activeNavItem = 'Contact';
    } else if (url.includes('products')) {
      this.activeNavItem = 'Products';
    } else {
      this.activeNavItem = 'Home';
    }
  }
}
