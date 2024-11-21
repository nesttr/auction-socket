'use strict'
const {sendHistory} = require("../services/room-service");

module.exports = async function (fastify, opts) {
  fastify.post('/auction/bid', async function (request, reply) {
    sendHistory(
        fastify,
        request.body.uuid
    )
    return { result: "success", auctionId: request.body.uuid }
  })
}
