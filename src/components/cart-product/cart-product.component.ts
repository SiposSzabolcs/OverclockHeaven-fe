import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-cart-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-product.component.html',
  styleUrl: './cart-product.component.css',
})
export class CartProductComponent {
  @Input() product: any;
  @Input() showPrice: boolean = true;
  router = inject(Router);
  productService = inject(ProductService);

  rateButtonClicked() {
    this.productService.setProduct(this.product);
    this.router.navigateByUrl('products/rating');
  }
}
