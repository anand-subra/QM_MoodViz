"""
MoodVizBit is a Python implementation of the BITalino API.

This is to be used with the Mood Visualiser application developed for QMUL

Please check the github repo for more info:

https://github.com/anand-subra/QM_MoodViz

"""

from time import sleep
import time, sys, math
from bluetooth.btcommon import BluetoothError
import numpy # Scientific computing package for Python
from socketIO_client import SocketIO, LoggingNamespace # socketIO implementation for Python
import bitalino # Bitalino API for Python


# SocketIO exclusive variables
URL = 'localhost'
PORT = 12345

# Test function to use to check end-to-end communication
# connection (py script -> browser)
def test_transm():
    print "***TESTING***"
    print "Port: " + str(PORT)
    print "URL: " + str(URL)
    while True:
        msg = raw_input('Type something: ') # Enable keyboard input
        socketIO.emit('board', msg) # Send input through socket, receive on browser console

# Establish connection with SocketIO server
with SocketIO(URL, PORT, LoggingNamespace) as socketIO:
    print "Port: " + str(PORT)
    print "URL: " + str(URL)
    print "Connection to SocketIO server established"


class MoodVizBit(object):

    def __init__(self):
        # BITalino API exclusive variables
        self.macAddress = "98:d3:31:30:28:81"

        # VCM address for Mac OS
        # self.macAddress = "/dev/tty.bitalino-DevB"

        self.batteryThreshold = 30
        self.acqChannels = [0,1]  # 0-7, left-top to right-bottom of Plugged board
        self.samplingRate = 1000
        self.nSamples = 10
        # self.digitalOutput = [0,0,1,1]

        # Define column to read from incoming data matrix
        self.bitPort1 = 5
        self.device = None

    # BT connnection timeout functionality
    def connect_bit(self, retry=5):
        if not retry:
            print "BITalino unreachable"
            sys.exit(-1)
            raise SystemExit
        if retry < 5:
            time.sleep(1)
        try:
            print "Looking for a BITalino device..."
            self.device = bitalino.BITalino(self.macAddress) # Attempt to connect to board with provided MAC address
        except BluetoothError as b:
            print b
            self.connect_bit(retry=retry-1)
            print "Connection to BITalino failed."
            sys.exit(-1)
        sleep(1)
        print "Connection to BITalino successful"
        socketIO.emit('boardstate', "yes") # Let the web app know if connection has been successful
        sleep(1)

    def check_if_bitconnected(self):
        try:
            self.conn.close() # If connection to board exists, terminate it
            sleep(1)
        except Exception as e:
            sleep(1)

    def get_send_data(self):
        # Start acquiring data from board
        self.device.start(self.samplingRate, self.acqChannels)
        # Loop for constant data streaming
        while True:
            incomingData = self.device.read(self.nSamples)
            edaData = incomingData[:, self.bitPort1]
            edaData = (edaData/1024) # Scale down sensor value (0-1, 1 being the highest value)
            arrData = numpy.array(edaData) # Add samples to an array
            avrData = numpy.mean(arrData) # Calculate mean of all values in array
            print avrData
            socketIO.emit('board', avrData) # Constantly send data as it is received from the board
            socketIO.emit('boardstate', "yes") # Constantly confirm connection to laptop whilst transmitting data


if __name__ == '__main__': # Main method

    bit = MoodVizBit() # Create new object of type MoodVizBit
    bit.check_if_bitconnected() # Terminate existing board connections, if any
    bit.connect_bit() # Connect to board via BT
    #test_transm()
    bit.get_send_data() # Receive and transmit data through socket
