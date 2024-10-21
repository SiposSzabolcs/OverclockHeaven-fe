import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from '../interceptors/custom.interceptor';
import { NgxStripeModule, provideNgxStripe } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([customInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideNgxStripe(
      'pk_test_51QBCMmRrg3X4nKEi6z72mICCJQQRT8Xrvjob0mK5SJtr7Lmy3ZiINKZiRgxRobYHiObWcYJBPx4KFZahvkDsDGEK002VM2QxZR'
    ),
  ],
};
