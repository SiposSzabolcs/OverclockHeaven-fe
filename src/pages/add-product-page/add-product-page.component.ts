import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product-page.component.html',
  styleUrl: './add-product-page.component.css',
})
export class AddProductPageComponent {
  product = {
    name: '',
    description: '',
    price: 0,
    tag: '',
  };
  selectedFile: File | null = null;

  http = inject(HttpClient);
  router = inject(Router);

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  backArrowClick() {
    this.router.navigateByUrl('admin');
  }

  private resetForm(): void {
    this.product = {
      name: '',
      description: '',
      price: 0,
      tag: '',
    };
    this.selectedFile = null;
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('tag', this.product.tag);

    this.http.post('http://localhost:8080/products/add', formData).subscribe(
      (response) => {
        console.log('Product added successfully', response);
        this.resetForm();
      },
      (error) => {
        console.error('Error adding product', error);
      }
    );
  }
}
