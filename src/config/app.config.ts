import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { provideMarkdown } from 'ngx-markdown';

import { provideRecipe } from '@infraestructure/driven-adapter/recipe';
import { provideIngredient } from '@infraestructure/driven-adapter/ingredient';
import { provideCategory } from '@infraestructure/driven-adapter/category';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_BASE_HREF, useValue: '/ng-ias/' },
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(),
    provideRecipe(),
    provideIngredient(),
    provideCategory(),
    provideMarkdown(),
  ],
};
