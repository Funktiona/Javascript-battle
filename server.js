//step 1) require the modules we need
var
    http = require('http'),
    path = require('path'),
    fs = require('fs'),

//these are the only file types we will support for now
    extensions = {
      ".html" : "text/html",
      ".css" : "text/css",
      ".js" : "application/javascript",
      ".png" : "image/png",
      ".gif" : "image/gif",
      ".jpg" : "image/jpeg"
    };


// comment

//helper function handles file verification
function getFile(filePath,res,page404,mimeType){
  //does the requested file exist?
  fs.exists(filePath,function(exists){
    //if it does...
    if(exists){
      //read the fiule, run the anonymous function
      fs.readFile(filePath,function(err,contents){
        if(!err){
          //if there was no error
          //send the contents with the default 200/ok header
          res.writeHead(200,{
            "Content-type" : mimeType,
            "Content-Length" : contents.length
          });
          res.end(contents);
        } else {
          //for our own troubleshooting
          console.dir(err);
        };
      });
    } else {
      //if the requested file was not found
      //serve-up our custom 404 page
      fs.readFile(page404,function(err,contents){
        //if there was no error
        if(!err){
          //send the contents with a 404/not found header
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(contents);
        } else {
          //for our own troubleshooting
          console.dir(err);
        };
      });
    };
  });
};

//a helper function to handle HTTP requests
function requestHandler(req, res) {
  var
      fileName = path.basename(req.url) || 'index.html',
      ext = path.extname(fileName),
      localFolder = __dirname + '/public/',
      page404 = localFolder + '404.html';

  //do we support the requested file type?
  if(!extensions[ext]){
    //for now just send a 404 and a short message
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end("&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;The requested file type is not supported&lt;/body&gt;&lt;/html&gt;");
  };

  //call our helper function
  //pass in the path to the file we want,
  //the response object, and the 404 page path
  //in case the requestd file is not found
  getFile((localFolder + fileName),res,page404,extensions[ext]);
};


var server = require('http').createServer(requestHandler);
var io = require('socket.io')(server);


var gameInfo = require('./gameInfo.js');

io.on('connection', function(socket){

    io.emit('gameInfo', gameInfo.sendGame());

    io.emit('enemies', gameInfo.getCurrentEnemies());

    socket.on('attack', function(mouseX, mouseY){
        gameInfo.attack(mouseX, mouseY);
    });

    socket.on('move', function(dir){
        gameInfo.move(dir);
    });
});
server.listen(3000);

fps30 = 1000 / 0.0333;

var player = gameInfo.player;
var enemies = gameInfo.enemies;
var arrows = gameInfo.arrows;

function loop()
{

    io.emit('enemiesPos', enemies);
    io.emit('arrows', arrows);
    io.emit('playerPos', player);
    io.emit('render', 'now');

    gameInfo.update();

    setTimeout(loop, 33,33);
}

loop();
