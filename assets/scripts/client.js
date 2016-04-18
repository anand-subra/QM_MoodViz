// Socket programming implementation using SocketIO (client/browser-side)
// Create SocketIO instance, connect to port specified in 'server.js'
var socket = io('localhost:12345'); //IP address or domain followed by port number

// Indicate when board connects using a listener
socket.on('connect',function() {
	console.log('Board has connected');
});

// Recieve data from 'message' channel, then set value to variable used in 'main.js'
socket.on('message',function(data) {
	console.log('Received data from the board!', data);
	EDAvalue = data;
	$("#bitmsg").html(EDAvalue);
});

// Indicate when board disconnects using a listener
socket.on('disconnect',function() {
	console.log('Board has disconnected!');
});

// Recieve data from 'boardstate' channel, then set connection indicator accordingly via Bootstrap classes
socket.on('boardstate', function(connectState){
	// If connected, show transfer icon
	if (connectState == "yes"){
		$("#bitstate").removeClass('glyphicon-exclamation-sign');
		$("#bitstate").addClass('glyphicon-transfer');
	}
	// If not connected, show exclamation icon
	else{
		$("#bitstate").removeClass('glyphicon-transfer');
		$("#bitstate").addClass('glyphicon-exclamation-sign');
	}
});
