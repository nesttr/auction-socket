const fp = require("fastify-plugin");
const {Server} = require("socket.io");
const {sendHistory} = require("../services/room-service");


module.exports = fp(async function (fastify, opts) {
    const io = new Server(fastify.server, {
        cors: {origin: "*"},
    });

    fastify.decorate("socket", io);

    fastify.ready()
        .then(() => {
            fastify.socket.on("connection", async (socket) => {
                console.log(`${socket.id} connected!`);

                socket.on('subscribe', (room) => {
                    socket.join(room);
                    sendHistory(fastify,room);
                });
                socket.on('unsubscribe', (room) => {
                    socket.leave(room);
                });
                socket.on("disconnect", async () => {
                    console.log(`${socket.id} disconnected!`);
                });
            });
        });
});