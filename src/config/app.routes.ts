import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@ui/pages/recipe-list/recipe-list.component').then(
        (m) => m.RecipeListComponent
      ),
  },
  {
    path: 'recipe-form',
    loadComponent: () =>
      import('@ui/pages/recipe-form/recipe-form.component').then(
        (m) => m.RecipeFormComponent
      ),
  },
];
