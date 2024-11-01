import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-panel-page.component.html',
  styleUrl: './admin-panel-page.component.css',
})
export class AdminPanelPageComponent {
  router = inject(Router);

  routerConfig(destination: string) {
    switch (destination) {
      case 'add':
        this.router.navigateByUrl('admin/add');
        break;
      case 'change':
        this.router.navigateByUrl('admin/change');
        break;
      case 'analytics':
        this.router.navigateByUrl('admin/analytics');
        break;
    }
  }
}
