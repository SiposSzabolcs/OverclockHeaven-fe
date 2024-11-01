import { Routes } from '@angular/router';
import { LandingPageComponent } from '../pages/landing-page/landing-page.component';
import { FeaturesPageComponent } from '../pages/features-page/features-page.component';
import { ContactPageComponent } from '../pages/contact-page/contact-page.component';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { AddProductPageComponent } from '../pages/add-product-page/add-product-page.component';
import { ProductsPageComponent } from '../pages/products-page/products-page.component';
import { CartComponent } from '../pages/cart/cart.component';
import { SuccessPageComponent } from '../pages/success-page/success-page.component';
import { SingleProductPageComponent } from '../pages/single-product-page/single-product-page.component';
import { PurchaseHistoryPageComponent } from '../pages/purchase-history-page/purchase-history-page.component';
import { RatingPageComponent } from '../pages/rating-page/rating-page.component';
import { AdminPanelPageComponent } from '../pages/admin-panel-page/admin-panel-page.component';
import { ChangeProductPageComponent } from '../pages/change-product-page/change-product-page.component';
import { AnalyticsPageComponent } from '../pages/analytics-page/analytics-page.component';

export const routes: Routes = [
  { path: 'home', redirectTo: '' },
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'features',
    component: FeaturesPageComponent,
  },
  {
    path: 'contact',
    component: ContactPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
  {
    path: 'products/product',
    component: SingleProductPageComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'success',
    component: SuccessPageComponent,
  },
  {
    path: 'purchaseHistory',
    component: PurchaseHistoryPageComponent,
  },
  {
    path: 'products/rating',
    component: RatingPageComponent,
  },
  {
    path: 'admin',
    component: AdminPanelPageComponent,
  },
  {
    path: 'admin/add',
    component: AddProductPageComponent,
  },
  {
    path: 'admin/change',
    component: ChangeProductPageComponent,
  },
  {
    path: 'admin/analytics',
    component: AnalyticsPageComponent,
  },
];
