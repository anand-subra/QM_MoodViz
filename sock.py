from socketIO_client import SocketIO, LoggingNamespace

with SocketIO('localhost', 3000, LoggingNamespace) as socketIO:

    while True:
        msg = raw_input('Type something: ')
        socketIO.emit('board', msg)


#CREATE SERVER, EMIT TO CHANNEL 'board'

#
# # Import socket module
# import socket
#
# # Create a socket object
# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#
# # Define the port on which you want to connect
# port = 3000
#
# # connect to the server on local computer
# s.connect(('127.0.0.1', port))
#
# while True:
#     msg = raw_input('Type something: ')
#     s.send(msg)
