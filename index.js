var five = require("johnny-five");
var board = new five.Board({ port: "COM3" });
// var board = new five.Board();

board.on("ready", function() {
  console.log('ready');
  
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A0"
  });

  temperature.on("change", function() {
    console.log(this.celsius + "°C", this.fahrenheit + "°F");
  });
});