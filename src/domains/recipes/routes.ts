import type { FastifyInstance, FastifyRequest } from 'fastify';
import { RecipeUsecase } from './usecase.js';
import { recipeJsonSchema, recipeParamsJsonSchema, type Recipe, type RecipeParams } from './types.js';

export async function recipeRoutes(request: FastifyInstance): Promise<void> {
  const recipeUsecase = new RecipeUsecase();
  request.post('/', { schema: { body: recipeJsonSchema } }, async (request: FastifyRequest<{ Body: Recipe }>, reply) => {
    const { title, making_time, serves, ingredients, cost } = request.body;
    const recipe = await recipeUsecase.createRecipe({
      title,
      making_time,
      serves,
      ingredients,
      cost,
    });

    return reply.status(200).send(recipe);
  });

  request.get('/', async (_: FastifyRequest<{}>, reply) => {
    const recipesList = await recipeUsecase.getRecipes();
    return reply.status(200).send(recipesList);
  });

  request.get('/:id', { schema: { params: recipeParamsJsonSchema } }, async (request: FastifyRequest<{ Params: RecipeParams }>, reply) => {
    const recipe: Recipe = await recipeUsecase.getRecipeById(request.params.id);
    return reply.status(200).send({ message: 'Recipe details by id', recipe });
  });

  request.patch(
    '/:id',
    { schema: { params: recipeParamsJsonSchema } },
    async (request: FastifyRequest<{ Params: RecipeParams }>, reply) => {
      const mockResult = {
        message: 'Recipe successfully updated!',
        recipe: [
          {
            title: 'Tomato Soup',
            making_time: '15 min',
            serves: '5 people',
            ingredients: 'onion, tomato, seasoning, water',
            cost: '450',
          },
        ],
      };
      return reply.status(200).send(mockResult);
    },
  );

  request.delete(
    '/:id',
    { schema: { params: recipeParamsJsonSchema } },
    async (request: FastifyRequest<{ Params: RecipeParams }>, reply) => {
      const mockResult = { message: 'Recipe successfully removed!' };
      return reply.status(200).send(mockResult);
    },
  );
}
