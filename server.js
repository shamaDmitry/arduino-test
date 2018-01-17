var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var SerialPort = require('serialport');
var parser = SerialPort.parsers.Readline;
var port = new SerialPort('COM3', {
  baudrate: 9600,
  parser: parser
});

port.on('open', onOpen);
port.on('data', onData);

function onOpen() {
	console.log('Arduino connected');
}

function onData(data) {
	console.log('Data:', data);
}

server.listen(8000, function() {
	console.log("server run");
});