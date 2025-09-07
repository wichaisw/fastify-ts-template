// import { Container } from 'typedi';

// const fp = require('fastify-plugin');
// const mysql = require('mysql2/promise');

// function fastifyMysql(fastify: any, options: any, done: any) {
//   const connection = mysql.createConnection(options);

//   if (!Container.get('mysql')) {
//     Container.set('mysql', connection);
//   }

//   fastify.addHook('onClose', (fastify: any, done: any) => connection.end().then(done).catch(done));

//   done();
// }

// export default fp(fastifyMysql, { name: 'fastify-mysql-connection' });

import { Container } from 'typedi';
import fp from 'fastify-plugin';
import fastifyMysqlPlugin from '@fastify/mysql';

// First register the @fastify/mysql plugin directly
const mysqlPlugin = fp(
  async (fastify, options) => {
    // Register the official @fastify/mysql plugin without dependencies
    await fastify.register(fastifyMysqlPlugin, {
      promise: true,
      ...options,
    });

    // Store the connection in the container for dependency injection
    if (!Container.has('mysql')) {
      Container.set('mysql', fastify.mysql);
    }
  },
  { name: 'fastify-mysql-connection' },
);

export default mysqlPlugin;
