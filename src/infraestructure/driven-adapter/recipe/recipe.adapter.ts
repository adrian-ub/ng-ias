import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { RecipeGateway } from '@domain/models/recipe/recipe.gateway';
import { RecipeModel } from '@domain/models/recipe/recipe.model';

import { RecipeMapper } from './mappers/recipe.mapper';

@Injectable({
  providedIn: 'root',
})
export class RecipeAdapter implements RecipeGateway {
  private readonly httpClient = inject(HttpClient);

  addRecipe(
    data: Omit<RecipeModel, 'id' | 'category' | 'ingredients'> & {
      categoryId: string;
      ingredients: { ingredientId: string; amount: string }[];
    }
  ): Observable<{ data: RecipeModel[] }> {
    return this.httpClient.post<{ data: RecipeModel[] }>('/recipes', data);
  }

  getRecipes(): Observable<RecipeModel[]> {
    return this.httpClient
      .get<{ data: RecipeModel[] }>('/recipes')
      .pipe(map(RecipeMapper.transformGetRecipestoRecipes));
  }

  markFavorite(id: number): Observable<RecipeModel[]> {
    return this.httpClient
      .post<{ data: RecipeModel[] }>('/recipes/add-fovorite', {
        id,
      })
      .pipe(map((data) => data.data));
  }

  getRecipe(id: number): Observable<RecipeModel> {
    return this.httpClient
      .get<{ data: RecipeModel }>('/recipes/' + id)
      .pipe(map((data) => data.data));
  }
}
