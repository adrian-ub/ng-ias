import { Injectable, inject } from '@angular/core';
import { RecipeGateway } from '../models/recipe/recipe.gateway';
import { RecipeModel } from '../models/recipe/recipe.model';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeUsecase {
  private readonly recipeGateway = inject(RecipeGateway);

  addRecipe(
    data: Omit<RecipeModel, 'id' | 'category' | 'ingredients'> & {
      categoryId: string;
      ingredients: { ingredientId: string; amount: string }[];
    }
  ) {
    return lastValueFrom(this.recipeGateway.addRecipe(data));
  }

  getRecipes() {
    return lastValueFrom(this.recipeGateway.getRecipes());
  }

  markFavorite(id: number) {
    return lastValueFrom(this.recipeGateway.markFavorite(id));
  }

  getRecipe(id: number) {
    return lastValueFrom(this.recipeGateway.getRecipe(id));
  }
}
