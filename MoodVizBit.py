"""
MoodVizBit is a Python implementation of the BITalino API.

Please check the github repo for more info:

https://github.com/anand-subra/QM_MoodViz

"""
# Disable error codes for pylint
# pylint: disable-msg=C0103
# pylint: disable-msg=C0111
# pylint: disable=too-many-instance-attributes

from time import sleep
import time, sys, math
from bluetooth.btcommon import BluetoothError
import numpy
from scipy import stats
from socketIO_client import SocketIO, LoggingNamespace
import bitalino


# SocketIO exclusive variables
URL = 'localhost'
PORT = 12345

# Test function to use to check end-to-end
# connection (py script -> browser)
def test_transm():
    print "***TESTING***"
    print "Port: " + str(PORT)
    print "URL: " + str(URL)
    while True:
        msg = raw_input('Type something: ')
        socketIO.emit('board', msg)

def linlin(val, inmin, inmax, outmin, outmax):
  if (val <= inmin):
    return outmin
  elif val >= inmax:
    return outmax
  return (val - inmin) / (inmax-inmin) * (outmax-outmin) + outmin

with SocketIO(URL, PORT, LoggingNamespace) as socketIO:
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
        self.bitPort2 = 6
        self.device = None
            # self.bitPort3 = 7
            # self.bitPort4 = 8
            # etc...

    def connect_bit(self, retry=5):
        if not retry:
            print "BITalino unreachable"
            sys.exit(-1)
            raise SystemExit
        if retry < 5:
            time.sleep(1)
        try:
            print "Looking for a BITalino device..."
            self.device = bitalino.BITalino(self.macAddress)
        except BluetoothError as b:
            print b
            self.connect_bit(retry=retry-1)
            print "Connection to BITalino failed."
            sys.exit(-1)
        sleep(1)
        print "Connection to BITalino successful"
        socketIO.emit('boardstate', "yes")
        #print "Version: " + self.device.version()
        sleep(1)

    def check_if_bitconnected(self):
        try:
            self.conn.close()
            #print "Terminated existing BITalino connection"
            sleep(1)
        except Exception as e:
            #print "No existing BITalino connected"
            sleep(1)

    def get_data(self):
        # Start acquiring data from board
        self.device.start(self.samplingRate, self.acqChannels)
        # Loop for constant data streaming
        while True:
            incomingData = self.device.read(self.nSamples)
            channel0 = incomingData[:, self.bitPort1]
            channel0 = (channel0/1024)
            arrch0 = numpy.array(channel0)
            avrch0 = numpy.mean(arrch0)
            print avrch0
            socketIO.emit('board', avrch0)


if __name__ == '__main__':

    bit = MoodVizBit()
    bit.check_if_bitconnected()
    bit.connect_bit()
    #test_transm()
    bit.get_data()
