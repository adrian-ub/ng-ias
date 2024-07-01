import { Provider } from '@angular/core';
import { RecipeGateway } from '@domain/models/recipe/recipe.gateway';
import { RecipeAdapter } from './recipe.adapter';

export function provideRecipe(): Provider {
  return {
    provide: RecipeGateway,
    useClass: RecipeAdapter,
  };
}
