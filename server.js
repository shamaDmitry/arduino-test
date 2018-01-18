var express = require('express');
var app = express();
var server = require('http').createServer(app);
var five = require('johnny-five');
var io = require('socket.io')(server);

var port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

server.listen(port, function() {
	console.log("server run");
});


var board = new five.Board({ port: "COM3" });

board.on("ready", function() {
  console.log('board ready');
  
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 2000
  });

  io.on('connection', function (socket) {  
    
    temperature.on("change", function() {
      var currTemp = {'celsius':this.C};
      socket.emit('currTemp', currTemp);
    });

    console.log('socket.id', socket.id);
  });
});