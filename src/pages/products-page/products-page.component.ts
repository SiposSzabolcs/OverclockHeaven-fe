import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsListComponent } from '../../components/products-list/products-list.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductsListComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent {
  activeButton: string = 'CPUs';
  isSortDropdownVisible = false;
  sortBy = 'ratings';

  enableSortDropdownVisibility() {
    this.isSortDropdownVisible = true;
  }

  changeSortBy(sortBy: string) {
    this.sortBy = sortBy;
    this.isSortDropdownVisible = false;
  }

  setActiveButton(buttonNumber: string): void {
    console.log(buttonNumber);

    this.activeButton = buttonNumber;
  }
}
