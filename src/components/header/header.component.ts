import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderHeroComponent } from '../header-hero/header-hero.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HeaderHeroComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isDropdownVisible = false;
  activeNavItem: string = 'Home';

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  setActive(navItem: string) {
    this.activeNavItem = navItem; // Set the clicked item as active
  }
}
