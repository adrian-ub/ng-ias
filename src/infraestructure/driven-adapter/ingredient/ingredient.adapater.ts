import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IngredientGateway } from '@domain/models/ingredient/ingredient.gateway';
import { IngredientModel } from '@domain/models/ingredient/ingredient.model';
import { Observable, map } from 'rxjs';
import { IngredientMapper } from './mappers/ingredient.mapper';

@Injectable({ providedIn: 'root' })
export class IngredientAdapter implements IngredientGateway {
  private readonly http = inject(HttpClient);
  getIngredients(): Observable<IngredientModel[]> {
    return this.http
      .get<{
        data: IngredientModel[];
      }>('/ingredients')
      .pipe(map(IngredientMapper.transformGetIngredientsToIngredients));
  }
}
