const {getHistory} = require("../models/auction");
const Room = {
    sendHistory: async (fastify , room) => {
        getHistory(fastify.mysql , room)
            .then((results) => {
                console.log( results , room )
                fastify.socket.sockets.in(room).emit("history", results);
            });
    },
}

module.exports = Room;