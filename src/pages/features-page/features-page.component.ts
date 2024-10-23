import { Component } from '@angular/core';
import { ImageTextComponent } from '../../components/image-text/image-text.component';

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [ImageTextComponent],
  templateUrl: './features-page.component.html',
  styleUrl: './features-page.component.css',
})
export class FeaturesPageComponent {
  imageTexts: any[] = [
    {
      h1Content: 'Our Store Has Up-to-Date Hardware',
      h2Content: 'Stay Ahead with the Latest Technology',
      pContent:
        "Explore our wide range of cutting-edge components from top brands. Whether you're a gamer, content creator, or tech enthusiast, we have the perfect hardware to meet your needs. Upgrade your setup with the latest graphics cards, processors, and accessories that deliver unbeatable performance.",
      buttonContent: 'Shop Now',
      imgSrc: 'heropic2.png',
      buttonRoute: 'products',
    },
    {
      h1Content: 'Choose One of Our Prebuilt PCs',
      h2Content: 'Ready to Game, Ready to Impress',
      pContent:
        'Skip the hassle of building and choose from our selection of high-performance prebuilt PCs. Each rig is designed for optimal performance, equipped with the latest technology to handle any gaming or creative workload. Find your perfect match today and elevate your gaming experience!',
      buttonContent: 'Browse Prebuilts',
      imgSrc: 'heropic3.png',
      buttonRoute: 'products',
    },
  ];
}
