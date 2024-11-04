import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  router = inject(Router);

  routerConfig(destination: string) {
    switch (destination) {
      case '':
        this.router.navigateByUrl('');
        break;
      case 'features':
        this.router.navigateByUrl('features');
        break;
      case 'products':
        this.router.navigateByUrl('products');
        break;
      case 'contact':
        this.router.navigateByUrl('contact');
        break;
    }
  }
}
