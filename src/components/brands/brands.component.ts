import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  brands = [
    { src: 'intel.svg' },
    { src: 'amd-logo-1.svg' },
    { src: 'nvidia-7.svg' },
    { src: 'kingston-3.svg' },
    { src: 'msi-5.svg' },
    { src: 'corsair-2.svg' },
    { src: 'hyperx-logo-lg.svg' },
  ];
}
