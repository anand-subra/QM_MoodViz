from socketIO_client import SocketIO, LoggingNamespace
import bitalino
from time import sleep
from bluetooth.btcommon import BluetoothError
import numpy as np

# SocketIO exclusive variables
URL = 'localhost'
port = 12345

with SocketIO(URL, port, LoggingNamespace) as socketIO:
    print "Connection to SocketIO server established"


class MoodVizBit(object):
        # Setup process for class
        def __init__(self):
            # BITalino API exclusive variables
            self.macAddress = "98:d3:31:30:28:81"

            # VCM address for Mac OS
            # self.macAddress = "/dev/tty.bitalino-DevB"

            self.batteryThreshold = 30
            self.acqChannels = [0]  # 0-7, left-top to right-bottom of board
            self.samplingRate = 1000
            self.nSamples = 100
            # self.digitalOutput = [0,0,1,1]

            # Define column to read from incoming data matrix
            self.bitPort1 = 5
            self.bitPort2 = 6
            # self.bitPort3 = 7
            # self.bitPort4 = 8
            # etc...

        def disconnect_bit(self):
            self.device = bitalino.BITalino(self.macAddress)
            self.device.close()

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
            print "Version: " + self.device.version()

        # Test function to use to check end-to-end
        # connection (py script -> browser)
        def test_transm(self):
            while True:
                msg = raw_input('Type something: ')
                # msg = bitBoard.read(nSamples)
                socketIO.emit('board', msg)

        def send_sensor_data(self):
            self.device.start(self.samplingRate, self.acqChannels)
            while True:
                msg = self.device.read(self.nSamples)
                socketIO.emit('board', msg)

        def sort_data(self):
            # Start acquiring data from board
            self.device.start(self.samplingRate, self.acqChannels)

            # Loop for constant data streaming
            while True:
                incomingData = self.device.read(self.nSamples)
                channel0 = incomingData[:, self.bitPort1]
                c0 = np.array(channel0)
                print c0
                print " "
                sleep(1)


if __name__ == '__main__':

    app = MoodVizBit()
    app.disconnect_bit()
    app.connect_bit()
    # app.test_transm()
    # app.send_sensor_data()
    app.sort_data()
