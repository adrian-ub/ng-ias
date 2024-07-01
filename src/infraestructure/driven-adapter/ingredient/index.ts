import { Provider } from '@angular/core';
import { IngredientGateway } from '@domain/models/ingredient/ingredient.gateway';
import { IngredientAdapter } from './ingredient.adapater';

export function provideIngredient(): Provider {
  return {
    provide: IngredientGateway,
    useClass: IngredientAdapter,
  };
}
