import { HttpResponse, PathParams, http } from 'msw';
import { db } from './db';
import { RecipeModel } from '@domain/models/recipe/recipe.model';

export const handlers = [
  http.get('/recipes', async () => {
    const recipesPromise = (await db.recipes.toArray()).map(async (recipe) => {
      const { categoryId, ...rest } = recipe;
      return {
        ...rest,
        category: await db.categories.get(categoryId),
        ingredients: await Promise.all(
          rest.ingredients.map(async ({ amount, ingredientId }) => {
            return {
              amount,
              ingredient: await db.ingredients.get(ingredientId),
            };
          })
        ),
      };
    });

    const recipes = await Promise.all(recipesPromise);

    return HttpResponse.json({ data: recipes });
  }),
  http.post<
    PathParams,
    Omit<RecipeModel, 'id' | 'category' | 'ingredients'> & {
      categoryId: string;
      ingredients: { ingredientId: string; amount: string }[];
    }
  >('/recipes', async ({ request }) => {
    const body = await request.json();
    const { categoryId, ingredients, ...recipe } = body;
    const recipeId = await db.recipes.add({
      ...recipe,
      id: undefined as unknown as number,
      categoryId: parseInt(categoryId, 10),
      ingredients: ingredients.map(({ ingredientId, amount }) => ({
        ingredientId: parseInt(ingredientId, 10),
        amount,
      })),
    });

    const newRecipe = await db.recipes.get(recipeId);

    return HttpResponse.json({ data: newRecipe });
  }),
  http.post<PathParams, { id: number }>(
    '/recipes/add-fovorite',
    async ({ request }) => {
      const body = await request.json();
      const recipe = await db.recipes.where({ id: body.id }).first();
      await db.recipes.update(body.id, {
        isFavorite: !recipe?.isFavorite,
      });
      return HttpResponse.json({ data: 'ok' });
    }
  ),
  http.get('/categories', async () => {
    const categories = await db.categories.toArray();
    return HttpResponse.json({ data: categories });
  }),
  http.get('/ingredients', async () => {
    const ingredients = await db.ingredients.toArray();
    return HttpResponse.json({ data: ingredients });
  }),
];
