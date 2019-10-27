var express = require('express');
var app = express();
var server = require('http').Server(app);
var os = require('os');
var path = require('path');
var port = 80;

var tessel = require('tessel');
var av = require('tessel-av');
var camera = new av.Camera({
  fps: 60
});

tessel.close();
tessel.led[2].off();

server.listen(port, function () {
  console.log(`Live stream listening at: http://${os.hostname()}.local`);
  tessel.led[2].on();
});

app.use(express.static(path.join(__dirname, '/public')));
app.get('/stream', (request, response) => {
  response.redirect(camera.url);
});
