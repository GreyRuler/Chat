import * as WS from 'ws';
import * as http from 'http';
import Koa from 'koa';
import cors from '@koa/cors';
import router from './routes';
var app = new Koa();
var port = 7070;
app.use(cors());
app.use(router());
var server = http.createServer(app.callback()).listen(port);
var chat = [];
var wsServer = new WS.Server({
    server: server
});
wsServer.on('connection', function (ws) {
    ws.on('message', function (rawData) {
        var data = JSON.parse(rawData);
        var date = new Date();
        var currentDate = "".concat(date.toLocaleDateString(), " ").concat(date.toLocaleTimeString());
        var message = {
            from: data.user,
            date: currentDate,
            text: data.message
        };
        chat.push(message);
        var eventData = JSON.stringify({ chat: [message] });
        Array.from(wsServer.clients)
            .filter(function (client) { return client.readyState === WS.OPEN; })
            .forEach(function (client) { return client.send(eventData); });
    });
    ws.send(JSON.stringify({ chat: chat }));
});
//# sourceMappingURL=server.js.map