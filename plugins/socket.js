const fp = require("fastify-plugin");
const { Server } = require("socket.io");


module.exports = fp(async function (fastify, opts) {
  const io = new Server(fastify.server, {
    cors: { origin: "*" },
  });

  fastify.decorate("socket", io);

  fastify.ready()
    .then(() => {
      fastify.socket.on("connection", async (socket) => {
        console.log(socket.id)
        socket.on('subscribe', (room) => {
          socket.join(room);
            // io.sockets.in(room).emit('message', 'what is going on, party people?');
        });
        socket.on('unsubscribe', (room) => {
          socket.leave(room);
        });
        socket.on("disconnect", async () => {
          console.log(`${socket.name} disconnected!`);
        });
      });
    });
});