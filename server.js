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
	console.log("server run on port " + port);
});


var board = new five.Board();

board.on("ready", function() {
  console.log('board ready');
  
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0",
    freq: 1000
  });

  io.on('connection', function (socket) {     
    temperature.on("data", function() {
      var currTemp = {
        "celsius": this.celsius,
        "fahrenheit": this.fahrenheit
      }

      socket.emit('currTemp', currTemp);
    });

    console.log(socket);
  });
});