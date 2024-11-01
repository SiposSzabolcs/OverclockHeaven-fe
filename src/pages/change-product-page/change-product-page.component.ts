import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotyfService } from '../../services/notyf/notyf.service';
import { environment } from '../../environments/environment.development';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  tag: string;
}
@Component({
  selector: 'app-change-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-product-page.component.html',
  styleUrl: './change-product-page.component.css',
})
export class ChangeProductPageComponent {
  notyf = inject(NotyfService);
  http = inject(HttpClient);
  router = inject(Router);

  data: any[] = [];
  loading: boolean = false;
  buttonsVisable: boolean = true;
  productVisible: boolean = false;
  product: Product = { name: '', description: '', price: 0, tag: '', id: 0 };
  selectedFile: File | null = null;

  fetchProductsByTag(tag: string) {
    this.loading = true;
    this.buttonsVisable = false;
    this.productVisible = true;

    this.http
      .get<any[]>(`${environment.baseUrl}/products/get/${tag}`)
      .subscribe({
        next: (data) => {
          this.data = data;
          this.loading = false;
        },
        error: (error) => {
          console.error(error.error.error);
          this.loading = false;
        },
      });
  }

  selectProduct(product: Product) {
    this.productVisible = false;

    this.product.id = product.id;
    this.product.name = product.name;
    this.product.description = product.description;
    this.product.price = product.price;
    this.product.tag = product.tag;

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 10);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  backArrowConfig(destination: string) {
    switch (destination) {
      case 'productList':
      case 'changeForm':
        this.buttonsVisable = true;
        this.productVisible = false;
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }, 10);
        break;
      case 'chooseTag':
        this.router.navigateByUrl('admin');
        break;
    }
  }

  onSubmit(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('tag', this.product.tag);

    this.http
      .put(
        `${environment.baseUrl}/products/update/${this.product.id}`,
        formData
      )
      .subscribe(
        (response) => {
          this.notyf.success('Product changed.');
        },
        (error) => {
          this.notyf.error('Something went wrong.');
        }
      );
  }

  onDelete(): void {
    this.http
      .delete(`${environment.baseUrl}/products/remove/${this.product.id}`)
      .subscribe(
        (response) => {
          this.notyf.success('Product deleted.');
        },
        (error) => {
          this.notyf.error('Something went wrong.');
        }
      );
  }
}
