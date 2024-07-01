import { Injectable, inject } from '@angular/core';
import { IngredientGateway } from '@domain/models/ingredient/ingredient.gateway';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IngredientUsecase {
  private readonly gateway = inject(IngredientGateway);

  getIngredients() {
    return lastValueFrom(this.gateway.getIngredients());
  }
}
