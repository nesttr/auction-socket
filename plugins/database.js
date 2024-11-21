const fp = require("fastify-plugin");


module.exports = fp(async function (fastify, opts) {
  fastify.register(
    require('@fastify/mysql'), {
    connectionString: 'mysql://sail:password@localhost:3306/laravel'

  })
});