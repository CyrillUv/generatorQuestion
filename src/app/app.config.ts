import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { appProvider } from './app.providers';
import {GlobalErrorHandler} from "./components";
// import { GlobalErrorHandler } from './components/handlers/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ...appProvider,
  ],
};
