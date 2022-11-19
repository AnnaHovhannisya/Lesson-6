var express = require('express');

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server);

var messages = [];

app.use(express.static("."));

app.get('/', function (req, res) {

res.redirect('index.html');

});

server.listen(3000);

var Grass = require("./prog3/grass.js")
var GrassEater = require("./prog3/grassEater.js")
var Predator = require("./prog3/predator.js")
var Water = require("./prog3/water.js")
var Fire = require("./prog3/fire.js")

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let gr = new Grass(x, y);
            grassArr.push(gr)
        } else if (matrix[y][x] == 2) {
            let grEat = new GrassEater(x, y);
            grassEaterArr.push(grEat)
        }
        else if (matrix[y][x] == 3) {
            let pred = new Predator(x, y);
            predatorArr.push(pred);
        }
        else if (matrix[y][x] == 4) {
            let wat = new Water(x, y);
            waterArr.push(wat);
        }
        else if (matrix[y][x] == 5) {
            let fr = new Fire(x, y);
            fireArr.push(fr);
        }
    }
}

let sendData = {
    matrix: matrix,
    GrassStatics:GrassStatics,
  }


  io.sockets.emit("matrix", sendData)



io.on('connection', function (socket) {

for(var i in messages) {

socket.emit("sendmatrix", messages[i]);

}

socket.on("send message", function (data) {

messages.push(data);

io.sockets.emit("display message", data);

});

});