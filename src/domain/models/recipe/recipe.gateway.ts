import { RecipeModel } from './recipe.model';

import { Observable } from 'rxjs';

export abstract class RecipeGateway {
  abstract addRecipe(
    data: Omit<RecipeModel, 'id'>
  ): Observable<{ data: RecipeModel[] }>;
  abstract getRecipes(): Observable<RecipeModel[]>;
  abstract markFavorite(id: number): Observable<RecipeModel[]>;
}
