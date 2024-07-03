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
    path: 'recipe/:id',
    loadComponent: () =>
      import('@ui/pages/recipe-view/recipe-view.component').then(
        (m) => m.RecipeViewComponent
      ),
  },
  {
    path: 'recipe-form',
    loadComponent: () =>
      import('@ui/pages/recipe-form/recipe-form.component').then(
        (m) => m.RecipeFormComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@ui/pages/404/404.component').then((m) => m.Error404Component),
  },
];
