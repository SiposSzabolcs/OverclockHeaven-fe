import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from '../interceptors/custom.interceptor';
import { provideNgxStripe } from 'ngx-stripe';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { environment } from '../environments/environment';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([customInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideCharts(withDefaultRegisterables()),
    provideNgxStripe(environment.stripePublicKey),
    provideRouter(routes),
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
};
