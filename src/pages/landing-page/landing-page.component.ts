import { Component } from '@angular/core';
import { ImageTextComponent } from '../../components/image-text/image-text.component';
import { BrandsComponent } from '../../components/brands/brands.component';
import { HeaderHeroComponent } from '../../components/header-hero/header-hero.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [ImageTextComponent, BrandsComponent, HeaderHeroComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  h1Content: string = 'Get the Ultimate Gaming Experience';
  h2Content: string = 'Shop, Choose, and Play';
  pContent: string =
    'Discover our range of high-performance prebuilt PCs or explore our storefor top-quality components to enhance your gaming setup. Your perfect gaming rig is just a few clicks away.';
  buttonContent: string = 'Explore the Store';
  imgSrc: string = 'heropic1.png';
}
