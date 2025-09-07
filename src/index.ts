import 'reflect-metadata';
import fastify from 'fastify';
import { recipeRoutes } from '@/domains/recipes/routes.js';
import mysqlConnection from './infrastructures/mysql-connection.js';
import { RecipeRepository } from './domains/recipes/repositories.js';
import { Container } from 'typedi';
import { errorHandler } from './errors/handler.js';

const server = fastify();
server.setErrorHandler(errorHandler(server));

await mysqlConnection(server, {
  type: 'mysql',
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ?? '3306',
  host: process.env.MYSQL_HOST,
});

server.register(recipeRoutes, { prefix: '/recipes' });

// dependency injection
Container.set('mysql', server.mysql);
Container.set(RecipeRepository, new RecipeRepository());

server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
