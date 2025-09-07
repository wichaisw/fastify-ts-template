import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import type { Recipe, RecipeResponse } from './types.js';

export async function recipeRoutes(request: FastifyInstance): Promise<void> {
  request.post('/', async (_: FastifyRequest<{}>, reply) => {
    const mockPostResult = {
      message: 'Recipe successfully created!',
      recipe: [
        {
          id: '3',
          title: 'Tomato Soup',
          making_time: '15 min',
          serves: '5 people',
          ingredients: 'onion, tomato, seasoning, water',
          cost: '450',
          created_at: '2016-01-12 14:10:12',
          updated_at: '2016-01-12 14:10:12',
        },
      ],
    };
    return reply.status(200).send(mockPostResult);
  });

  request.get('/', async (_: FastifyRequest<{}>, reply) => {
    const mockResult = {
      recipes: [
        {
          id: 1,
          title: 'Chicken Curry',
          making_time: '45 min',
          serves: '4 people',
          ingredients: 'onion, chicken, seasoning',
          cost: '1000',
        },
        {
          id: 2,
          title: 'Rice Omelette',
          making_time: '30 min',
          serves: '2 people',
          ingredients: 'onion, egg, seasoning, soy sauce',
          cost: '700',
        },
        {
          id: 3,
          title: 'Tomato Soup',
          making_time: '15 min',
          serves: '5 people',
          ingredients: 'onion, tomato, seasoning, water',
          cost: '450',
        },
      ],
    };

    return reply.status(200).send(mockResult);
  });

  request.get('/:id', async (_: FastifyRequest<{ Params: { id: string } }>, reply) => {
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
  });

  request.patch('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
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
  });

  request.delete('/:id', async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
    const mockResult = { message: 'Recipe successfully removed!' };
    return reply.status(200).send(mockResult);
  });
}
