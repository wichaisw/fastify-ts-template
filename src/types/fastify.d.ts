import fastify from 'fastify';
import { Connection } from 'mysql2/promise';

declare module 'fastify' {
  interface FastifyInstance {
    mysql: Connection;
  }
}
