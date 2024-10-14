import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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

  constructor(private router: Router) {}

  ngOnInit() {
    // Check local storage for the active nav item
    const storedNavItem = localStorage.getItem('activeNavItem');
    if (storedNavItem) {
      this.activeNavItem = storedNavItem; // Set to stored item
    }

    // Listen for route changes and update activeNavItem
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.setActiveBasedOnRoute(currentUrl);
      });
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  setActive(navItem: string) {
    this.activeNavItem = navItem;
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
