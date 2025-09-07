import type { FastifyInstance } from 'fastify';
import { RecipeError } from './recipe.js';

export const errorHandler = (fastify: FastifyInstance) => async (error: any, request: any, reply: any) => {
  fastify.log.error({ error }, 'server handled error');

  if (error instanceof RecipeError) {
    return reply.status(error.status).send({ message: error.message });
  }
  return reply.status(500).send({ message: 'Internal Server Error' });
};
