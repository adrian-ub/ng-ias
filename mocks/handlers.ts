import { HttpResponse, http } from 'msw';
import { db } from './db';

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

    return HttpResponse.json(recipes);
  }),
];
