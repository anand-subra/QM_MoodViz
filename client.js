// Create SocketIO instance, connect
var socket = io('localhost:12345');


// Add a connect listener
socket.on('connect',function() {
	console.log('Client has connected to the server (board)!');
});
// Add a connect listener
socket.on('message',function(data) {
	//On 'message' channel, message from BITalino board
	console.log('Received a message from the board!',data);
	//$("#bitmsg").html(data);
	EDAvalue = data;
	//$("#bitmsg").html(EDAvalue);
});
// Add a disconnect listener
socket.on('disconnect',function() {
	console.log('The client has disconnected!');
});

socket.on('boardstate', function(data){
	if (data == "yes"){
		$("#bitstate").removeClass('glyphicon-exclamation-sign');
		$("#bitstate").addClass('glyphicon-transfer');
	}
	else{
		$("#bitstate").removeClass('glyphicon-transfer');
		$("#bitstate").addClass('glyphicon-exclamation-sign');
	}
});

// Sends a message to the server via sockets
function sendMessageToServer(message) {
	socket.send(message);
}
