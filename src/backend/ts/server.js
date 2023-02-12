"use strict";
exports.__esModule = true;
var WS = require("ws");
var http = require("http");
var koa_1 = require("koa");
var cors_1 = require("@koa/cors");
var routes_1 = require("./routes");
var app = new koa_1["default"]();
var port = 7070;
app.use((0, cors_1["default"])());
app.use((0, routes_1["default"])());
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
