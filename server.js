// Socket programming implementation using SocketIO (server-side)
// Require HTTP module (to start server) and Socket.IO to allow communication
var http = require('http'), io = require('socket.io');

// Start the server at port 8080
var server = http.createServer(function(req, res){
  // Navigating to http://127.0.0.1:12345/ will provide the following response
  res.writeHead(200,{ 'Content-Type': 'text/html' });
  res.end('<h1>Mood Visualizer</h1><p>This is the server side application.</p>');
});


// Create an instance of Socket.IO
var socket = io.listen(server);

// Indicate when web app (client) connects to the server using a listener
socket.on('connection', function(client){
  console.log('Web app has connected');

  client.on('message', function(event){
    console.log('Received message from client!',event);
  });

  // Transmit board connection state to client
  client.on('boardstate', function(data){
    client.broadcast.emit('boardstate', data);
    client.emit('message', data);
  });

  // Transmit sensor data to client
  client.on('board', function(data){
    client.broadcast.emit('message', data);
    console.log("EDA value: " +data);
  });

  // Indicate when board disconnects using a listener
  client.on('disconnect', function(){
    console.log('Board has disconnected');
    client.broadcast.emit('boardstate', "Board has disconnected");
  });
});

// Listen to a specific port number
server.listen(12345);
