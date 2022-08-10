const http = require("http");
const express = require('express');
const path = require('path');
const WebSocket = require('ws');

const app = express();
app.use(express.static(path.join(__dirname)));

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });


webSocketServer.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
        console.log('%s', data); // работает
    });

    ws.send('Отправляем на фронт'); // работает
});

server.listen(5500, () => {console.log("Поехали!")});