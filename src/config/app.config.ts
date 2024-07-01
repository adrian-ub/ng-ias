import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { provideRecipe } from '@infraestructure/driven-adapter/recipe';

import { appRoutes } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useValue: '/ng-ias/' },
    provideRouter(appRoutes),
    provideHttpClient(),
    provideRecipe(),
  ],
};
