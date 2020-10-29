var fs = require('fs');
var https = require('https');

var express = require('express');
var app = express();

var options = {
    key: fs.readFileSync('C:/Users/jabo/Desktop/key.pem'),
    cert: fs.readFileSync('C:/Users/jabo/Desktop/server.crt')
};

var serverPort = 4444;

var server = https.createServer(options, app);
var io = require('socket.io')(server);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
    console.log('new connection');
    socket.emit('message', 'This is a message from the dark side.');
});

server.listen(serverPort, function () {
    console.log('server up and running at %s port', serverPort);
});