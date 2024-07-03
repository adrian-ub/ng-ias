import { RecipeModel } from './recipe.model';

import { Observable } from 'rxjs';

export abstract class RecipeGateway {
  abstract addRecipe(
    data: Omit<RecipeModel, 'id' | 'category' | 'ingredients'> & {
      categoryId: string;
      ingredients: { ingredientId: string; amount: string }[];
    }
  ): Observable<{ data: RecipeModel[] }>;
  abstract getRecipes(): Observable<RecipeModel[]>;
  abstract markFavorite(id: number): Observable<RecipeModel[]>;
  abstract getRecipe(id: number): Observable<RecipeModel>;
}
