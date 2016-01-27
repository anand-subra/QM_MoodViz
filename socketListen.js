var port = 12345;
net = require('net');
net.createServer(function (socket) {

    socket.on('data', function (data) {
        console.log(data.toString());
    });
})

.listen(port);
console.log("port number is: " + port);
console.log("listening...");
