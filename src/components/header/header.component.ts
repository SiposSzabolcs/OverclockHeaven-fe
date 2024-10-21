import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UsersService } from '../../services/users/users.service';

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

  router = inject(Router);
  users = inject(UsersService);

  async ngOnInit() {
    const storedNavItem = localStorage.getItem('activeNavItem');
    if (storedNavItem) {
      this.activeNavItem = storedNavItem;
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

  login() {
    this.router.navigateByUrl('login');
    this.isUserDropdownVisible = false;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.isLoggedIn = false;
    this.isUserDropdownVisible = false;
  }

  cart() {
    this.router.navigateByUrl('cart');
    this.isUserDropdownVisible = false;
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
