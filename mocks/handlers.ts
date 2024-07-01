import { HttpResponse, PathParams, http } from 'msw';
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

    return HttpResponse.json({ data: recipes });
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
];
