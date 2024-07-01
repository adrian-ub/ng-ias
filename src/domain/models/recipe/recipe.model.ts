import { CategoryModel } from '@domain/models/category/category.model';
import { IngredientModel } from '@domain/models/ingredient/ingredient.model';

export interface RecipeModel {
  id: number;
  category: CategoryModel;
  title: string;
  photoUrl: string;
  isFavorite: boolean;
  time: number;
  ingredients: Array<{ ingredient: IngredientModel; amount: string }>;
  description: string;
}
