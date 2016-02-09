// Create SocketIO instance, connect
var socket = io('localhost:12345');


// Add a connect listener
socket.on('connect',function() {
	console.log('Client has connected to the server!');
});
// Add a connect listener
socket.on('message',function(data) {
	//On 'message' channel, message from BITalino board
	console.log('Received a message from the server!',data);
	var bitmsgdiv = document.getElementById('bitmsg')
	bitmsgdiv.innerHTML = data;
});
// Add a disconnect listener
socket.on('disconnect',function() {
	console.log('The client has disconnected!');
});

socket.on('boardstate', function(data){
	var bitstate = 	document.getElementById('bitstate');
	if (data == "yes"){
	bitstate.innerHTML = "Connected";
	}

	else{
		bitstate.innerHTML = "Disconnected";
	}
});

// Sends a message to the server via sockets
function sendMessageToServer(message) {
	socket.send(message);
}
