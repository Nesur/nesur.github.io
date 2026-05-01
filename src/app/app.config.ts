import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {IMAGE_CONFIG} from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920]
      }
    },]
};
