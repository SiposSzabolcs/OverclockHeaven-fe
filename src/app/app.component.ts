import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LandingPageComponent } from '../pages/landing-page/landing-page.component';
import { FeaturesPageComponent } from '../pages/features-page/features-page.component';
import { ContactPageComponent } from '../pages/contact-page/contact-page.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    FeaturesPageComponent,
    ContactPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'OverclockHeaven';

  router = inject(Router);

  shouldShowHeaderFooter(): boolean {
    const currentRoute = this.router.url;
    return !(currentRoute === '/login' || currentRoute === '/register');
  }
}
