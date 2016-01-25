import bitalino

import socket
import sys
from thread import *

#/dev/tty.bitalino-DevB
#macAddress = "98:D3:31:30:28:81"
#print "Looking for a device..."
#print bitalino.find()

"""
--------------------
BITalino CODE
--------------------
"""
"""
macAddress = "/dev/tty.bitalino-DevB"
batteryThreshold = 30
acqChannels = [0,3]
samplingRate = 1000
nSamples = 10
digitalOutput = [0,0,1,1]

print "Connecting..."
bitBoard = bitalino.BITalino(macAddress)
print "Connection complete"
print bitBoard.version()
print "This is the version boys!"

bitBoard.start(samplingRate, acqChannels)

print bitBoard.read(nSamples)

# Turn BITalino led on
bitBoard.trigger(digitalOutput)
"""




"""
--------------------
Socket CODE - SERVER SIDE
--------------------
"""

import socket

serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('localhost', 8089))
serversocket.listen(5) # become a server socket, maximum 5 connections

while True:
    connection, address = serversocket.accept()
    buf = connection.recv(64)
    if len(buf) > 0:
        print buf
        break



"""
--------------------
Socket CODE - CLIENT SIDE
--------------------
"""
"""
import socket

clientsocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
clientsocket.connect(('localhost', 8089))
clientsocket.send('hello')
"""
