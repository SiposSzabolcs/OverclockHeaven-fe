import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { HeaderHeroComponent } from '../components/header-hero/header-hero.component';
import { ImageTextComponent } from '../components/image-text/image-text.component';
import { BrandsComponent } from '../components/brands/brands.component';
import { FooterComponent } from '../components/footer/footer.component';
import { LandingPageComponent } from '../pages/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HeaderHeroComponent,
    ImageTextComponent,
    BrandsComponent,
    FooterComponent,
    LandingPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'OverclockHeaven';
}
