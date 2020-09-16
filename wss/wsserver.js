const WebSocket = require('ws');
const { USER_JOIN, USER_LIST, wsBroadcast, POST_MSG } = require('../util');
const WS_PORT = process.env.PORT | 3030;

module.exports = function () {

    const wsServer = new WebSocket.Server({ port: WS_PORT });

    /* simple data structure for all users present in the chat room */
    const userSet = new Set();

    wsServer.on('connection', (socket) => {
        let connectionIndex;

        socket.on('message', (data) => {
            const message = JSON.parse(data);

            switch (message.type) {
                case USER_JOIN: // TODO: if no such user is present
                    connectionIndex = userSet.size;
                    userSet.add({ name: message.name, id: connectionIndex });

                    socket.send({
                        type: USER_LIST,
                        users: userSet
                    });

                    wsBroadcast(wsServer, socket, {
                        type: USER_LIST,
                        users: userSet
                    });

                    break;

                case POST_MSG:
                    wsBroadcast(wsServer, socket, {
                        type: POST_MSG,
                        content: message.content,
                        author: message.author
                    });

                    break;

                default:
                    break;
            }
        });

        socket.on('close', () => {
            userSet.forEach((user) => user.id === connectionIndex ? userSet.delete(user) : user);
        })
    });
};