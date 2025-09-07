import 'reflect-metadata';
import fastify from 'fastify';
import { recipeRoutes } from '@/domains/recipes/routes.js';
const server = fastify();
import mysqlConnection from './infrastructures/mysql-connection.js';

console.log(process.env.MYSQL_USER);
mysqlConnection(server, {
  type: 'mysql',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT ?? '3306',
  host: process.env.MYSQL_HOST,
});

server.register(recipeRoutes, { prefix: '/recipes' });

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
