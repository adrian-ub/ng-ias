import { IngredientModel } from '@domain/models/ingredient/ingredient.model';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IngredientMapper {
  export function transformGetIngredientsToIngredients(data: {
    data: IngredientModel[];
  }) {
    return data.data;
  }
}
