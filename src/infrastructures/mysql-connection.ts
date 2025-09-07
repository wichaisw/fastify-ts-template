import { Container } from 'typedi';
import fp from 'fastify-plugin';
import fastifyMysqlPlugin from '@fastify/mysql';

const mysqlPlugin = fp(
  async (fastify, options) => {
    await fastify.register(fastifyMysqlPlugin, {
      promise: true,
      ...options,
    });

    Container.set('mysql', fastify.mysql);
  },
  { name: 'fastify-mysql-connection' },
);

export default mysqlPlugin;
