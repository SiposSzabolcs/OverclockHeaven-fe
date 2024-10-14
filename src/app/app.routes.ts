import { Routes } from '@angular/router';
import { LandingPageComponent } from '../pages/landing-page/landing-page.component';
import { FeaturesPageComponent } from '../pages/features-page/features-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'features',
    component: FeaturesPageComponent,
  },
];
