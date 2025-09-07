import fastify from 'fastify';
import { recipeRoutes } from '@/recipes/routes.js';
const server = fastify();

server.register(recipeRoutes, { prefix: '/recipes' });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
