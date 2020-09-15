const WebSocket = require('ws');
const WS_PORT = process.env.PORT | 3030;

module.exports = function () {

    const webSocketServer = new WebSocket.Server({port: WS_PORT});

    // TODO user per connection logic. If user already exists, return 'error' or something
    webSocketServer.on('connection', function connection(ws) {

        console.log(webSocketServer.clients);
        ws.on('message', function incoming(data) {
            console.log('ON MESSAGE ' + data)
            webSocketServer.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);

                    console.log('ON MESSAGE EVENT');
                    console.log(data);
                }
            });
        });

        // TODO Close connection
        ws.on('close', (data) => {

        })
    });
};