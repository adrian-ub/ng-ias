import { RecipeModel } from '@domain/models/recipe/recipe.model';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RecipeMapper {
  export function transformGetRecipestoRecipes(data: { data: RecipeModel[] }) {
    return data.data;
  }
}
